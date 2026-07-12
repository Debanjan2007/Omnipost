"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PanelCardProps {
    title:        string
    icon?:        ReactNode
    badge?:       ReactNode
    defaultOpen?: boolean
    children:     ReactNode
    className?:   string
}

/**
 * PanelCard — collapsible card panel used throughout the right column.
 * Smooth open/close with border separator between header and content.
 */
export function PanelCard({ title, icon, badge, defaultOpen = true, children, className }: PanelCardProps) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className={cn("bg-card border border-border rounded-2xl overflow-hidden", className)}>
            {/* ── Header ─────────────────────────────────────────────── */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors text-left"
            >
                <div className="flex items-center gap-2 min-w-0">
                    {icon && <span className="text-muted-foreground shrink-0">{icon}</span>}
                    <span className="text-sm font-semibold text-foreground truncate">{title}</span>
                    {badge}
                </div>
                <ChevronDown
                    size={14}
                    className={cn(
                        "text-muted-foreground/60 transition-transform duration-200 shrink-0 ml-2",
                        open && "rotate-180",
                    )}
                />
            </button>

            {/* ── Content ────────────────────────────────────────────── */}
            {open && (
                <div className="border-t border-border/50">
                    {children}
                </div>
            )}
        </div>
    )
}
