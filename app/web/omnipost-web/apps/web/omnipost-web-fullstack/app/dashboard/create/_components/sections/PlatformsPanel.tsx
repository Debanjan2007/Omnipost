"use client"

import { useState } from "react"
import { Share2, ChevronDown, ChevronUp, Check, Wifi, WifiOff } from "lucide-react"
import { PLATFORM_SPECS, type PlatformSpec } from "../data/platforms"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { PanelCard } from "../ui/PanelCard"
import { cn } from "@/lib/utils"

// ─── Single platform row ──────────────────────────────────────────────────────

function PlatformRow({
    spec, enabled, onToggle,
}: { spec: PlatformSpec; enabled: boolean; onToggle: () => void }) {
    const [open, setOpen] = useState(false)
    const [settings, setSettings] = useState(spec.settings.map(s => s.on))

    return (
        <div className={cn(
            "rounded-xl border transition-all",
            enabled ? "border-border/80 bg-muted/20" : "border-border/40 bg-transparent opacity-70",
        )}>
            {/* Main row */}
            <div className="flex items-center gap-3 p-3">
                <PlatformIcon name={spec.name} size={32}/>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-foreground">{spec.name}</p>
                        {spec.connected ? (
                            <span className="flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]">
                                <Wifi size={8}/> Live
                            </span>
                        ) : (
                            <span className="flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                                <WifiOff size={8}/> Off
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                        {spec.connected ? `${spec.handle} · ${spec.followers}` : "Not connected"}
                    </p>
                </div>

                {/* Toggle */}
                <button
                    type="button"
                    onClick={onToggle}
                    disabled={!spec.connected}
                    className={cn(
                        "relative w-8 h-4.5 rounded-full transition-colors shrink-0",
                        enabled && spec.connected ? "bg-primary" : "bg-muted",
                        !spec.connected && "cursor-not-allowed",
                    )}
                    style={{ height: "18px" }}
                >
                    <span className={cn(
                        "absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform",
                        enabled && spec.connected && "translate-x-3.5",
                    )}/>
                </button>

                {/* Expand settings */}
                {spec.settings.length > 0 && enabled && (
                    <button type="button" onClick={() => setOpen(!open)}
                        className="w-6 h-6 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                        {open ? <ChevronUp size={11}/> : <ChevronDown size={11}/>}
                    </button>
                )}
            </div>

            {/* Platform-specific settings */}
            {open && enabled && spec.settings.length > 0 && (
                <div className="border-t border-border/50 px-3 py-2.5 space-y-2">
                    {spec.settings.map((s, i) => (
                        <label key={i} className="flex items-center justify-between gap-2 cursor-pointer">
                            <span className="text-xs text-muted-foreground">{s.label}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    const next = [...settings]
                                    next[i] = !next[i]
                                    setSettings(next)
                                }}
                                className={cn(
                                    "relative w-7 h-4 rounded-full transition-colors shrink-0",
                                    settings[i] ? "bg-primary" : "bg-muted",
                                )}
                                style={{ height: "16px" }}
                            >
                                <span className={cn(
                                    "absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform",
                                    settings[i] && "translate-x-3",
                                )}/>
                            </button>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface PlatformsPanelProps {
    selected:    Set<string>
    setSelected: (s: Set<string>) => void
}

export function PlatformsPanel({ selected, setSelected }: PlatformsPanelProps) {
    function toggle(name: string) {
        const next = new Set(selected)
        if (next.has(name)) next.delete(name)
        else next.add(name)
        setSelected(next)
    }

    const countBadge = selected.size > 0 ? (
        <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
            {selected.size}
        </span>
    ) : undefined

    return (
        <PanelCard title="Platforms" icon={<Share2 size={14}/>} badge={countBadge}>
            <div className="px-3 py-3 space-y-2">
                {PLATFORM_SPECS.map(spec => (
                    <PlatformRow
                        key={spec.name}
                        spec={spec}
                        enabled={selected.has(spec.name)}
                        onToggle={() => toggle(spec.name)}
                    />
                ))}
            </div>
        </PanelCard>
    )
}
