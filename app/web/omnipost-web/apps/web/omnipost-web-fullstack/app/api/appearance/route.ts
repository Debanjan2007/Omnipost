import { auth } from "@clerk/nextjs/server"
import { prisma } from "@repo/database/src/index"
import { NextResponse } from "next/server"

const DEFAULT_SETTINGS = {
    theme: "system",
    accentColor: "indigo",
    density: "comfortable",
    animations: true,
}

export async function GET() {
    try {
        const { userId: clerkId } = await auth()
        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { clerkId },
            include: { appearanceSettings: true },
        })

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

        const user = await prisma.user.findUnique({
            where: { clerkId },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found in database" }, { status: 404 })
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
