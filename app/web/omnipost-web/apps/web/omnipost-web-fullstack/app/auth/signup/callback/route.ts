import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@repo/database/src/index'
import { generateJwtTokens } from '@/app/utils/Tokengen'

export async function GET() {
    try {
        const clerkUser = await currentUser()

        if (!clerkUser) {
            // Not authenticated — redirect to login
            return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'))
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress
        const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || 'User'

        if (!email) {
            console.error('[signup/callback] Clerk user has no email address')
            return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'))
        }

        // Generate tokens
        const { refreshToken, accessToken } = generateJwtTokens({
            accessFields: {
                clerkId: clerkUser.id,
                email,
            },
        })

        // Upsert the user — handles both first-time signup AND repeated signups gracefully
        const user = await prisma.user.upsert({
            where: { email },
            create: {
                email,
                name,
                clerkId: clerkUser.id,
                avatar: clerkUser.imageUrl ?? null,
                refreshToken,
            },
            update: {
                clerkId: clerkUser.id,
                // Keep profile fresh on every signup/re-oauth
                name,
                avatar: clerkUser.imageUrl ?? null,
                refreshToken,
            },
        })

        console.log('[signup/callback] User upserted:', user.id, user.email)

        // Set accessToken in a secure httpOnly cookie and redirect to dashboard
        const response = NextResponse.redirect(
            new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
        )

        response.cookies.set('omnipost_access', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 15, // 15 minutes
            path: '/',
        })

        return response
    } catch (err) {
        console.error('[signup/callback] Error:', err)
        return NextResponse.redirect(
            new URL('/login?error=server', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
        )
    }
}
