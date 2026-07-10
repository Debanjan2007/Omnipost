import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
])

// Routes only accessible to signed-out users
const isAuthRoute = createRouteMatcher([
    '/login(.*)',
    '/signup(.*)',
])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()

    // If user is signed in and tries to access login/signup, redirect to dashboard
    if (userId && isAuthRoute(req)) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // If user is not signed in and tries to access a protected route, redirect to login
    if (!userId && isProtectedRoute(req)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
