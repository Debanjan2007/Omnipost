"use client"

import { CheckCircle2, Calendar, ShieldAlert, FileEdit } from "lucide-react"

interface SummaryCardsProps {
    publishedCount: number
    scheduledCount: number
    failedCount: number
    draftCount: number
}

export function SummaryCards({ publishedCount, scheduledCount, failedCount, draftCount }: SummaryCardsProps) {
    const cards = [
        {
            label: "Posts Published",
            value: publishedCount,
            trend: "+12% this week",
            trendColor: "text-emerald-500",
            icon: <CheckCircle2 size={16} className="text-emerald-500" />,
            bgColor: "bg-emerald-500/10"
        },
        {
            label: "Scheduled",
            value: scheduledCount,
            trend: "Next in 4 hours",
            trendColor: "text-blue-500",
            icon: <Calendar size={16} className="text-blue-500" />,
            bgColor: "bg-blue-500/10"
        },
        {
            label: "Failed Publishes",
            value: failedCount,
            trend: failedCount > 0 ? "Requires review" : "0 conflicts",
            trendColor: failedCount > 0 ? "text-red-500" : "text-muted-foreground",
            icon: <ShieldAlert size={16} className="text-red-500" />,
            bgColor: "bg-red-500/10"
        },
        {
            label: "Draft Updates",
            value: draftCount,
            trend: "Saved in cloud",
            trendColor: "text-zinc-500",
            icon: <FileEdit size={16} className="text-zinc-500" />,
            bgColor: "bg-zinc-500/10"
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between space-y-3"
                >
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-muted-foreground truncate">{card.label}</span>
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${card.bgColor}`}>
                            {card.icon}
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <p className="text-2xl font-bold text-foreground tracking-tight">{card.value}</p>
                        <p className={`text-[10px] font-semibold ${card.trendColor}`}>{card.trend}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
