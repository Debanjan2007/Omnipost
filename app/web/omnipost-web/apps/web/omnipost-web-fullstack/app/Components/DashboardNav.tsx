"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { useTheme } from "@/app/context/ThemeContext"
import { useProfile } from "@/app/context/ProfileContext"
import { SidebarBody } from "@/app/Components/Sidebar"
import Image from "next/image"

/**
 * DashboardNav
 *
 * Slim top bar for the dashboard layout.
 * - Left: hamburger (mobile) → opens a Sheet containing the full sidebar
 * - Right: theme toggler + user avatar/name + Clerk UserButton
 *
 * Desktop nav items are intentionally omitted — the sidebar handles that.
 */
export function DashboardNav() {
    const { theme, setTheme } = useTheme()
    const { displayName, firstName, avatarUrl, isLoaded } = useProfile()
    const [sheetOpen, setSheetOpen] = useState(false)

    return (
        <header className="
            h-14 flex-shrink-0 sticky top-0 z-30
            flex items-center justify-between
            px-4 md:px-6
            bg-background/90 backdrop-blur-md
            border-b border-border
            transition-colors duration-300
        ">
            {/* ── Left: hamburger (mobile only) ──────────────────────────────── */}
            <div className="flex items-center gap-3">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger
                        className="
                            lg:hidden flex items-center justify-center
                            w-9 h-9 rounded-lg
                            text-muted-foreground hover:text-foreground
                            hover:bg-muted transition-colors duration-150
                        "
                        aria-label="Open navigation"
                    >
                        <Menu size={20} />
                    </SheetTrigger>

                    {/* Mobile sidebar — full-height left sheet with purple sidebar body */}
                    <SheetContent
                        side="left"
                        showCloseButton={false}
                        className="p-0 w-[240px] border-0"
                    >
                        <SidebarBody onNavigate={() => setSheetOpen(false)} />
                    </SheetContent>
                </Sheet>

                {/* App name visible on mobile (sidebar is hidden) */}
                <Link
                    href="/dashboard"
                    className="lg:hidden flex items-center gap-2"
                >
                    <Image src="/logo.png" alt="OmniPost" width={26} height={26} />
                    <span className="text-sm font-bold text-foreground">OmniPost</span>
                </Link>
            </div>

            {/* ── Right: theme + user ────────────────────────────────────────── */}
            <div className="flex items-center gap-3">
                {/* Animated theme toggle */}
                <AnimatedThemeToggler
                    theme={theme}
                    onThemeChange={setTheme}
                    variant="circle"
                    className="
                        w-9 h-9 flex items-center justify-center rounded-lg
                        text-muted-foreground hover:text-foreground
                        hover:bg-muted transition-colors duration-150
                    "
                />

                {/* Divider */}
                <div className="h-5 w-px bg-border hidden sm:block" />

                {/* User name — hidden on small screens */}
                {isLoaded && (
                    <span className="hidden sm:block text-sm font-medium text-foreground select-none">
                        {firstName ?? displayName}
                    </span>
                )}

                {/* Avatar / profile management via Clerk */}
                {avatarUrl ? (
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-8 h-8 ring-2 ring-primary/20 rounded-full",
                            },
                        }}
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {isLoaded ? (displayName?.[0] ?? "U").toUpperCase() : "…"}
                    </div>
                )}
            </div>
        </header>
    )
}
