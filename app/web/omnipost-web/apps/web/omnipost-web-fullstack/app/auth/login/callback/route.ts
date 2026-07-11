import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@repo/database/src/index'
import { generateJwtTokens } from '@/app/utils/Tokengen'

export async function GET() {
    try {
        const clerkUser = await currentUser()

        if (!clerkUser) {
            return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'))
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress

        if (!email) {
            console.error('[login/callback] Clerk user has no email address')
            return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'))
        }

        // Generate new tokens for this session
        const { refreshToken, accessToken } = generateJwtTokens({
            accessFields: {
                clerkId: clerkUser.id,
                email,
            },
        })

        // Find and update the existing user's refresh token.
        // If somehow the user doesn't exist in DB yet (edge case), create them.
        const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || 'User'

        const user = await prisma.user.upsert({
            where: { email },
            create: {
                email,
                name,
                avatar: clerkUser.imageUrl ?? null,
                refreshToken,
            },
            update: {
                refreshToken,
                // Keep avatar in sync in case they changed their profile picture
                avatar: clerkUser.imageUrl ?? null,
            },
        })


        // Set httpOnly cookie with accessToken and redirect to dashboard
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
        console.error('[login/callback] Error:', err)
        return NextResponse.redirect(
            new URL('/login?error=server', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
        )
    }
}
