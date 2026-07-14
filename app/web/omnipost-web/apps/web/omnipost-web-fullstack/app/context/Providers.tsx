"use client"

import { type ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { AppearanceProvider } from "@/app/context/AppearanceProvider"
import { ProfileProvider } from "@/app/context/ProfileContext"

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppearanceProvider>
                <ProfileProvider>
                    {children}
                </ProfileProvider>
            </AppearanceProvider>
        </ThemeProvider>
    )
}
