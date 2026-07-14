"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    CirclePlus,
    Link2,
    History,
    Settings,
    type LucideIcon,
} from "lucide-react"
import { useProfile } from "@/app/context"
import { cn } from "@/lib/utils"

// ─── Nav items ────────────────────────────────────────────────────────────────

interface NavItem {
    label: string
    href: string
    icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Create Post", href: "/dashboard/create", icon: CirclePlus },
    { label: "Connected Accounts", href: "/dashboard/accounts", icon: Link2 },
    { label: "History", href: "/dashboard/history", icon: History },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

// ─── Shared sidebar body (nav + user) ─────────────────────────────────────────

/**
 * SidebarBody
 * Renders the logo, nav items, and user footer inside the sidebar shell.
 * Extracted so it can be reused in both the desktop sidebar and the mobile Sheet.
 */
export function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname()
    const { displayName, firstName, avatarUrl, isLoaded } = useProfile()

    const isActive = (href: string) =>
        href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(href)

    const initial = (displayName?.[0] ?? "U").toUpperCase()

    return (
        <div className="flex flex-col h-full w-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-colors duration-300">

            {/* ── Logo ──────────────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 px-5 py-6 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-sidebar-primary/15 flex items-center justify-center shrink-0">
                    <Image src="/logo.png" alt="OmniPost" width={24} height={24} />
                </div>
                <span className="text-lg font-bold tracking-tight">OmniPost</span>
            </div>

            {/* ── Nav items ─────────────────────────────────────────────────── */}
            <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const active = isActive(href)
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onNavigate}
                            className={cn(
                                "flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                                active
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                            )}
                        >
                            <Icon
                                size={18}
                                strokeWidth={active ? 2.2 : 1.8}
                                className="shrink-0"
                            />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            {/* ── User footer ───────────────────────────────────────────────── */}
            <div className="shrink-0 border-t border-sidebar-border px-4 py-4">
                <Link
                    href="/dashboard/settings"
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-xl p-2 hover:bg-sidebar-accent/60 transition-colors duration-150 group"
                >
                    {/* Avatar */}
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={displayName}
                            width={36}
                            height={36}
                            className="rounded-full ring-2 ring-sidebar-border flex-shrink-0"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-sidebar-accent text-sidebar-accent-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                            {isLoaded ? initial : "…"}
                        </div>
                    )}

                    {/* Name + link */}
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-sidebar-foreground truncate leading-tight">
                            {isLoaded ? (firstName ?? displayName) : "Loading…"}
                        </p>
                        <p className="text-xs text-sidebar-foreground/55 group-hover:text-sidebar-foreground/75 transition-colors">
                            View Profile
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────

/**
 * Sidebar
 * Fixed-width column for lg+ screens.
 * Hidden on mobile — the mobile Sheet in DashboardNav handles that.
 */
export function Sidebar({ className }: { className?: string }) {
    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col w-[var(--sidebar-width)] shrink-0 h-screen sticky top-0",
                className
            )}
        >
            <SidebarBody />
        </aside>
    )
}

