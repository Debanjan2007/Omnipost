import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"

// ─── Card shell ───────────────────────────────────────────────────────────────

interface SectionCardProps {
    className?: string
    children:   ReactNode
}

export function SectionCard({ className, children }: SectionCardProps) {
    return (
        <div className={cn("bg-card border border-border rounded-2xl", className)}>
            {children}
        </div>
    )
}

// ─── Section heading row ──────────────────────────────────────────────────────

interface SectionTitleProps {
    children: ReactNode
    action?:  ReactNode
}

export function SectionTitle({ children, action }: SectionTitleProps) {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">{children}</h2>
            {action}
        </div>
    )
}

// ─── "View all" link ──────────────────────────────────────────────────────────

interface ViewAllProps {
    href:  string
    label?: string
}

export function ViewAll({ href, label = "View all" }: ViewAllProps) {
    return (
        <Link
            href={href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
        >
            {label} <ChevronRight size={11} />
        </Link>
    )
}
