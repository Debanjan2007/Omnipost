"use client"

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useTheme } from "@/app/context/ThemeContext"
import { useProfile } from "@/app/context/ProfileContext"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

/**
 * DashboardHeader
 *
 * Client component so it can access ThemeContext + ProfileContext.
 * The parent dashboard page stays a Server Component.
 */
export function DashboardHeader() {
    const { theme, setTheme } = useTheme()
    const { displayName, avatarUrl, isLoaded } = useProfile()

    return (
        <header className="
            sticky top-0 z-40 w-full
            border-b border-border
            bg-background/80 backdrop-blur-md
            px-6 md:px-8 py-3.5
            flex items-center justify-between
            transition-colors duration-300
        ">
            {/* Left — Logo + Nav */}
            <div className="flex items-center gap-8">
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <Image src="/logo.png" alt="OmniPost" width={32} height={32} />
                    <span className="text-lg font-bold text-foreground">OmniPost</span>
                </Link>

                <nav className="hidden md:flex items-center gap-5">
                    {[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Posts', href: '/dashboard/posts' },
                        { label: 'Analytics', href: '/dashboard/analytics' },
                        { label: 'Settings', href: '/dashboard/settings' },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Right — Theme toggle + User */}
            <div className="flex items-center gap-4">
                <AnimatedThemeToggler
                    theme={theme}
                    onThemeChange={setTheme}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                />

                {/* Clerk UserButton for sign out + profile management */}
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-8 h-8 ring-2 ring-primary/20 rounded-full",
                        },
                    }}
                />

                {/* Fallback name when Clerk is loaded */}
                {isLoaded && (
                    <span className="hidden md:block text-sm font-medium text-foreground">
                        {displayName}
                    </span>
                )}
            </div>
        </header>
    )
}
