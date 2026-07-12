import { auth } from "@clerk/nextjs/server"
import { prisma } from "@repo/database/src/index"
import { NextResponse } from "next/server"

const DEFAULT_SETTINGS = {
    theme: "system",
    accentColor: "indigo",
    density: "comfortable",
    animations: true,
}

// Helper to find or auto-create database user by ClerkId
async function getOrCreateDbUser(clerkId: string) {
    // 1. Try to find by clerkId
    let user = await prisma.user.findUnique({
        where: { clerkId },
        include: { appearanceSettings: true }
    })

    // 2. Fallback: if not found, fetch details from Clerk
    if (!user) {
        const { currentUser } = await import("@clerk/nextjs/server")
        const clerkUser = await currentUser()
        if (clerkUser) {
            const email = clerkUser.emailAddresses[0]?.emailAddress
            const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || 'User'
            
            if (email) {
                // Try finding by email (in case they signed up but clerkId wasn't set)
                user = await prisma.user.findUnique({
                    where: { email },
                    include: { appearanceSettings: true }
                })
                
                if (user) {
                    // Update user with clerkId if it was missing
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { clerkId },
                        include: { appearanceSettings: true }
                    })
                } else {
                    // Create new user in PostgreSQL database on-the-fly
                    user = await prisma.user.create({
                        data: {
                            email,
                            name,
                            clerkId,
                            avatar: clerkUser.imageUrl ?? null,
                        },
                        include: { appearanceSettings: true }
                    })
                    console.log(`[API/APPEARANCE] Auto-created database user on-the-fly for clerkId ${clerkId}`)
                }
            }
        }
    }

    return user
}

export async function GET() {
    try {
        const { userId: clerkId } = await auth()
        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await getOrCreateDbUser(clerkId)
        if (!user) {
            return NextResponse.json(DEFAULT_SETTINGS)
        }

        return NextResponse.json(user.appearanceSettings || DEFAULT_SETTINGS)
    } catch (error) {
        console.error("[API/APPEARANCE GET] Error:", error)
        return NextResponse.json(DEFAULT_SETTINGS)
    }
}

export async function PUT(req: Request) {
    try {
        const { userId: clerkId } = await auth()
        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { theme, accentColor, density, animations } = body

        const user = await getOrCreateDbUser(clerkId)
        if (!user) {
            return NextResponse.json({ error: "User not found in database and auto-creation failed" }, { status: 404 })
        }

        const settings = await prisma.appearanceSettings.upsert({
            where: { userId: user.id },
            create: {
                userId: user.id,
                theme: theme ?? "system",
                accentColor: accentColor ?? "indigo",
                density: density ?? "comfortable",
                animations: animations !== false,
            },
            update: {
                theme: theme ?? "system",
                accentColor: accentColor ?? "indigo",
                density: density ?? "comfortable",
                animations: animations !== false,
            },
        })

        return NextResponse.json(settings)
    } catch (error) {
        console.error("[API/APPEARANCE PUT] Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
