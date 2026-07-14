"use client"

import { Shield, Sparkles, RefreshCcw, KeyRound, Check } from "lucide-react"
import { PanelCard } from "../ui/PanelCard"
import { cn } from "@/lib/utils"

interface AccountHealthCardProps {
    healthScore: "excellent" | "good" | "warning" | "error"
}

export function AccountHealthCard({ healthScore }: AccountHealthCardProps) {
    const getHealthText = () => {
        switch (healthScore) {
            case "excellent": return { title: "Excellent Health", desc: "All APIs operational, tokens secure", color: "#10b981", score: 98 }
            case "good":      return { title: "Good Health", desc: "Token expiration approaching on some apps", color: "#10b981", score: 85 }
            case "warning":   return { title: "Attention Required", desc: "Some accounts require authorization renewal", color: "#f59e0b", score: 62 }
            case "error":     return { title: "Action Needed", desc: "Critical tokens expired or revoked", color: "#ef4444", score: 35 }
        }
    }

    const health = getHealthText()

    return (
        <PanelCard title="System Health" icon={<Shield size={13} />} defaultOpen={false}>
            <div className="px-4 py-3.5 space-y-4">
                
                {/* Meter gauge */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-foreground">{health.title}</span>
                        <span className="font-bold text-foreground" style={{ color: health.color }}>{health.score}/100</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-normal">{health.desc}</p>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
                        <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{ width: `${health.score}%`, backgroundColor: health.color }}
                        />
                    </div>
                </div>

                {/* Recommendations List */}
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={10} className="text-primary" /> Security & API Recommendations
                    </p>
                    
                    <div className="space-y-2">
                        {healthScore !== "excellent" ? (
                            <>
                                <div className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted/10 transition-colors flex items-start gap-2.5">
                                    <KeyRound size={12} className="text-amber-500 mt-0.5 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-foreground">Reauthorize Expired Tokens</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">Twitter/X credentials expired. Click reconnect to restore API publishing permissions.</p>
                                    </div>
                                </div>
                                <div className="p-2.5 rounded-xl border border-border bg-card hover:bg-muted/10 transition-colors flex items-start gap-2.5">
                                    <RefreshCcw size={12} className="text-primary mt-0.5 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-foreground">Review App Scopes</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">Requesting comment permissions for LinkedIn to enable auto-moderation replies.</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="p-3 rounded-xl border border-[color-mix(in_srgb,var(--color-success)_20%,transparent)] bg-[color-mix(in_srgb,var(--color-success)_8%,transparent)] flex items-center gap-2">
                                <Check size={14} className="text-emerald-500 shrink-0" />
                                <p className="text-xs text-emerald-500 font-medium">All systems operational, no recommendations</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PanelCard>
    )
}
