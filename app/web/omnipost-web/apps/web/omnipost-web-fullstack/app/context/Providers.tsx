"use client"

/**
 * Providers.tsx
 *
 * Single client-side boundary that composes all React context providers.
 * Import this in the root layout (a Server Component) to inject contexts
 * without turning the whole layout into a client component.
 *
 * Order matters — outer providers are available to inner ones:
 *   ClerkProvider  (already in layout)
 *     └─ ThemeProvider   (reads localStorage, no Clerk dependency)
 *          └─ ProfileProvider  (depends on ClerkProvider being above it)
 */

import { type ReactNode } from "react"
import { ThemeProvider } from "@/app/context/ThemeContext"
import { ProfileProvider } from "@/app/context/ProfileContext"

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider>
            <ProfileProvider>
                {children}
            </ProfileProvider>
        </ThemeProvider>
    )
}
