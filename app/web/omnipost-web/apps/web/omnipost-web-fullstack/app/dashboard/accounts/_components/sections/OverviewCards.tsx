"use client"

import { Wifi, ShieldAlert, CheckCircle2, History } from "lucide-react"

interface OverviewCardsProps {
    connectedCount: number
    healthyCount: number
    attentionCount: number
    lastSync: string
}

export function OverviewCards({ connectedCount, healthyCount, attentionCount, lastSync }: OverviewCardsProps) {
    const stats = [
        {
            title: "Connected Accounts",
            value: connectedCount,
            desc: "Active social links configured",
            trend: "Max 10 channels",
            color: "text-primary bg-primary/10",
            icon: <Wifi size={16} />
        },
        {
            title: "Healthy Connections",
            value: healthyCount,
            desc: "OAuth tokens valid and live",
            trend: "100% capacity",
            color: "text-[var(--color-success)] bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)]",
            icon: <CheckCircle2 size={16} />
        },
        {
            title: "Requiring Attention",
            value: attentionCount,
            desc: "Credentials expired or revoked",
            trend: attentionCount > 0 ? "Needs reauth" : "0 conflicts",
            color: attentionCount > 0
                ? "text-red-500 bg-red-500/10"
                : "text-muted-foreground bg-muted",
            icon: <ShieldAlert size={16} />
        },
        {
            title: "Last Global Sync",
            value: lastSync,
            desc: "Automatic feed cron status",
            trend: "Auto sync ON",
            color: "text-[var(--color-info)] bg-[color-mix(in_srgb,var(--color-info)_10%,transparent)]",
            icon: <History size={16} />
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm space-y-3 flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-muted-foreground truncate">{stat.title}</span>
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                            {stat.icon}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-2xl font-bold text-foreground tracking-tight truncate">
                            {stat.value}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground gap-2">
                            <span className="truncate">{stat.desc}</span>
                            <span className="font-semibold text-foreground shrink-0">{stat.trend}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
