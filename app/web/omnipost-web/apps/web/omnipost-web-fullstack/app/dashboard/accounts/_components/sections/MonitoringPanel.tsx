"use client"

import { useState } from "react"
import { ChevronDown, RefreshCcw, Shield, Activity } from "lucide-react"
import { SyncStatusCard } from "./SyncStatusCard"
import { AccountHealthCard } from "./AccountHealthCard"
import { cn } from "@/lib/utils"

interface MonitoringPanelProps {
    healthScore: "excellent" | "good" | "warning" | "error"
}

export function MonitoringPanel({ healthScore }: MonitoringPanelProps) {
    const [open, setOpen] = useState(false)

    const healthLabel = {
        excellent: "All systems operational",
        good:      "Systems healthy",
        warning:   "Attention required",
        error:     "Action needed",
    }[healthScore]

    const healthDot = {
        excellent: "bg-emerald-500",
        good:      "bg-emerald-500",
        warning:   "bg-amber-500",
        error:     "bg-red-500",
    }[healthScore]

    return (
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
            {/* Collapsed trigger bar */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Activity size={13} className="text-muted-foreground" />
                        <span className="text-xs font-semibold text-foreground">System Monitoring</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className={cn("w-1.5 h-1.5 rounded-full", healthDot)} />
                        <span className="text-[10px] text-muted-foreground hidden sm:inline">{healthLabel}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-3 text-[10px] text-muted-foreground pr-2">
                        <span className="flex items-center gap-1">
                            <RefreshCcw size={10} /> Sync Engine
                        </span>
                        <span className="flex items-center gap-1">
                            <Shield size={10} /> Health Check
                        </span>
                    </div>
                    <ChevronDown
                        size={14}
                        className={cn(
                            "text-muted-foreground/60 transition-transform duration-200 shrink-0",
                            open && "rotate-180",
                        )}
                    />
                </div>
            </button>

            {/* Expanded content */}
            {open && (
                <div className="border-t border-border/50 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    <SyncStatusCard />
                    <AccountHealthCard healthScore={healthScore} />
                </div>
            )}
        </div>
    )
}
