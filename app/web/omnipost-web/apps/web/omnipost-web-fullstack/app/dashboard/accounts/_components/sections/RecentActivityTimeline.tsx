"use client"

import { Activity, Clock } from "lucide-react"
import { RECENT_ACTIVITIES } from "../data/mockData"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { PanelCard } from "../ui/PanelCard"
import { cn } from "@/lib/utils"

export function RecentActivityTimeline() {
    return (
        <PanelCard title="Security & Connection Log" icon={<Activity size={14} />}>
            <div className="px-4 py-3 space-y-4">
                <div className="relative border-l border-border/80 ml-2.5 pl-4 space-y-4 py-1.5">
                    {RECENT_ACTIVITIES.map((activity) => (
                        <div key={activity.id} className="relative">
                            {/* Dot element */}
                            <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                                <PlatformIcon name={activity.platform} size={12} className="rounded-sm" />
                            </div>

                            {/* Content */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center gap-2">
                                    <span className={cn(
                                        "text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                                        activity.type === "connected" && "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-(--color-success)",
                                        activity.type === "refreshed" && "bg-[color-mix(in_srgb,var(--color-info)_12%,transparent)] text-(--color-info)",
                                        activity.type === "warning" && "bg-[color-mix(in_srgb,var(--color-warning)_12%,transparent)] text-(--color-warning)",
                                        activity.type === "sync" && "bg-muted text-muted-foreground",
                                        activity.type === "error" && "bg-red-500/12 text-red-500"
                                    )}>
                                        {activity.type}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                                        <Clock size={9} /> {activity.time}
                                    </span>
                                </div>
                                <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                                    {activity.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PanelCard>
    )
}
