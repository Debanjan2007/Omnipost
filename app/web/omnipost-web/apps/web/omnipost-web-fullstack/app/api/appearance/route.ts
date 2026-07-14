import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@repo/database/src/index"
import { NextResponse } from "next/server"

// ─── Types ────────────────────────────────────────────────────────────────────

const VALID_THEMES      = ["light", "dark", "system"] as const
const VALID_ACCENTS     = ["indigo", "purple", "blue", "green", "pink", "orange"] as const
const VALID_DENSITIES   = ["comfortable", "compact"] as const

type Theme   = typeof VALID_THEMES[number]
type Accent  = typeof VALID_ACCENTS[number]
type Density = typeof VALID_DENSITIES[number]

const DEFAULT_SETTINGS = {
    theme:       "system"      as Theme,
    accentColor: "indigo"      as Accent,
    density:     "comfortable" as Density,
    animations:  true,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Structured server-side log for every API event */
function log(level: "INFO" | "WARN" | "ERROR", handler: string, msg: string, meta?: unknown) {
    const prefix = `[API/APPEARANCE][${handler}][${level}]`
    if (level === "ERROR") {
        console.error(prefix, msg, meta ?? "")
    } else {
        console.log(prefix, msg, meta ?? "")
    }
}

/** Find the DB user by clerkId, or create one on the fly using Clerk profile data */
async function getOrCreateDbUser(clerkId: string) {
    log("INFO", "getOrCreateDbUser", `Looking up user for clerkId=${clerkId}`)

    // 1. Fast path: user already exists by clerkId
    let user = await prisma.user.findUnique({
        where:   { clerkId },
        include: { appearanceSettings: true },
    })

    if (user) {
        log("INFO", "getOrCreateDbUser", `Found existing user id=${user.id}`)
        return user
    }

    // 2. Slow path: first time this Clerk user hits our DB
    log("INFO", "getOrCreateDbUser", "User not found by clerkId — fetching from Clerk to create/update")

    const clerkUser = await currentUser()
    if (!clerkUser) {
        throw new Error(`Clerk returned no currentUser() for clerkId=${clerkId}`)
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress
    if (!email) {
        throw new Error(`Clerk user ${clerkId} has no primary email address`)
    }

    const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() || "User"

    // 2a. Maybe they exist by email (old record without clerkId)
    user = await prisma.user.findUnique({
        where:   { email },
        include: { appearanceSettings: true },
    })

    if (user) {
        log("INFO", "getOrCreateDbUser", `Found user by email — stamping clerkId onto id=${user.id}`)
        user = await prisma.user.update({
            where:   { id: user.id },
            data:    { clerkId },
            include: { appearanceSettings: true },
        })
        return user
    }

    // 2b. Brand-new user
    log("INFO", "getOrCreateDbUser", `Creating new DB user for email=${email}`)
    user = await prisma.user.create({
        data: {
            email,
            name,
            clerkId,
            avatar: clerkUser.imageUrl ?? null,
        },
        include: { appearanceSettings: true },
    })
    log("INFO", "getOrCreateDbUser", `Created DB user id=${user.id}`)
    return user
}

// ─── GET /api/appearance ──────────────────────────────────────────────────────

export async function GET() {
    try {
        const { userId: clerkId } = await auth()

        if (!clerkId) {
            log("WARN", "GET", "Unauthenticated request — returning 401")
            return NextResponse.json(
                { error: "Unauthorized", message: "You must be signed in to load appearance settings." },
                { status: 401 }
            )
        }

        log("INFO", "GET", `Fetching settings for clerkId=${clerkId}`)

        const user = await getOrCreateDbUser(clerkId)

        if (!user) {
            log("WARN", "GET", "getOrCreateDbUser returned null — returning defaults")
            return NextResponse.json(DEFAULT_SETTINGS)
        }

        const settings = user.appearanceSettings ?? DEFAULT_SETTINGS
        log("INFO", "GET", `Returning settings for userId=${user.id}`, settings)
        return NextResponse.json(settings)

    } catch (error) {
        log("ERROR", "GET", "Unhandled exception", error)
        // Return defaults silently on GET — the UI should still work
        return NextResponse.json(DEFAULT_SETTINGS)
    }
}

// ─── PUT /api/appearance ──────────────────────────────────────────────────────

export async function PUT(req: Request) {
    try {
        // ── Authentication ────────────────────────────────────────────────────
        const { userId: clerkId } = await auth()

        if (!clerkId) {
            log("WARN", "PUT", "Unauthenticated save attempt")
            return NextResponse.json(
                { error: "Unauthorized", message: "Your session has expired. Please sign in again." },
                { status: 401 }
            )
        }

        // ── Parse & validate body ─────────────────────────────────────────────
        let body: Record<string, unknown>
        try {
            body = await req.json()
        } catch {
            log("WARN", "PUT", "Could not parse request body as JSON")
            return NextResponse.json(
                { error: "Bad Request", message: "Request body must be valid JSON." },
                { status: 400 }
            )
        }

        const { theme, accentColor, density, animations } = body

        log("INFO", "PUT", `Save request from clerkId=${clerkId}`, body)

        // Validate each field and collect errors
        const validationErrors: string[] = []

        if (theme !== undefined && !VALID_THEMES.includes(theme as Theme)) {
            validationErrors.push(`Invalid theme "${theme}". Must be one of: ${VALID_THEMES.join(", ")}.`)
        }
        if (accentColor !== undefined && !VALID_ACCENTS.includes(accentColor as Accent)) {
            validationErrors.push(`Invalid accentColor "${accentColor}". Must be one of: ${VALID_ACCENTS.join(", ")}.`)
        }
        if (density !== undefined && !VALID_DENSITIES.includes(density as Density)) {
            validationErrors.push(`Invalid density "${density}". Must be one of: ${VALID_DENSITIES.join(", ")}.`)
        }
        if (animations !== undefined && typeof animations !== "boolean") {
            validationErrors.push(`Invalid animations value "${animations}". Must be a boolean.`)
        }

        if (validationErrors.length > 0) {
            log("WARN", "PUT", "Validation failed", validationErrors)
            return NextResponse.json(
                { error: "Validation Failed", message: validationErrors.join(" ") },
                { status: 400 }
            )
        }

        // ── Resolve DB user ────────────────────────────────────────────────────
        let user
        try {
            user = await getOrCreateDbUser(clerkId)
        } catch (userError) {
            log("ERROR", "PUT", "Failed to resolve DB user", userError)
            const msg = userError instanceof Error ? userError.message : String(userError)
            return NextResponse.json(
                { error: "User Not Found", message: `Could not find or create a database user: ${msg}` },
                { status: 404 }
            )
        }

        // ── Upsert AppearanceSettings ──────────────────────────────────────────
        let settings
        try {
            settings = await prisma.appearanceSettings.upsert({
                where:  { userId: user.id },
                create: {
                    userId:      user.id,
                    theme:       (theme       as Theme)   ?? DEFAULT_SETTINGS.theme,
                    accentColor: (accentColor as Accent)  ?? DEFAULT_SETTINGS.accentColor,
                    density:     (density     as Density) ?? DEFAULT_SETTINGS.density,
                    animations:  typeof animations === "boolean" ? animations : DEFAULT_SETTINGS.animations,
                },
                update: {
                    theme:       (theme       as Theme)   ?? DEFAULT_SETTINGS.theme,
                    accentColor: (accentColor as Accent)  ?? DEFAULT_SETTINGS.accentColor,
                    density:     (density     as Density) ?? DEFAULT_SETTINGS.density,
                    animations:  typeof animations === "boolean" ? animations : DEFAULT_SETTINGS.animations,
                },
            })
        } catch (dbError) {
            log("ERROR", "PUT", "Prisma upsert failed", dbError)
            const msg = dbError instanceof Error ? dbError.message : String(dbError)
            return NextResponse.json(
                { error: "Database Error", message: `Failed to save appearance settings: ${msg}` },
                { status: 500 }
            )
        }

        log("INFO", "PUT", `Saved settings for userId=${user.id}`, settings)
        return NextResponse.json(settings)

    } catch (error) {
        // Top-level catch for completely unexpected errors
        log("ERROR", "PUT", "Unhandled top-level exception", error)
        const msg = error instanceof Error ? error.message : String(error)
        return NextResponse.json(
            { error: "Internal Server Error", message: msg },
            { status: 500 }
        )
    }
}
