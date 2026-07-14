"use client"

import { Clock, AlertTriangle, CheckCircle2, FileEdit, HelpCircle } from "lucide-react"
import type { HistoryEvent } from "../data/historyData"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

interface ActivityTimelineViewProps {
    events: HistoryEvent[]
    onSelectEvent: (event: HistoryEvent) => void
}

export function ActivityTimelineView({ events, onSelectEvent }: ActivityTimelineViewProps) {
    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-6">
            <div className="relative border-l border-border/80 ml-16 pl-6 space-y-6 py-2">
                {events.map((event) => {
                    const isFailed = event.status === "Failed"
                    const isPublished = event.status === "Published"
                    
                    // Extract time string for display (e.g. "10:45 AM" or "09:30 AM")
                    const timeMatch = event.timestamp.match(/\d{1,2}:\d{2}\s*(?:AM|PM)?/i)
                    const timeStr = timeMatch ? timeMatch[0] : "12:00"

                    return (
                        <div
                            key={event.id}
                            onClick={() => onSelectEvent(event)}
                            className="relative group cursor-pointer hover:translate-x-0.5 transition-transform duration-150"
                        >
                            {/* Time label on the absolute left outside border-l */}
                            <div className="absolute -left-[90px] top-1 w-14 text-right text-xs font-semibold text-muted-foreground/80 tabular-nums">
                                {timeStr}
                            </div>

                            {/* Circle node element on the line */}
                            <div className="absolute -left-[32px] top-0.5 w-4 h-4 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                                <PlatformIcon name={event.platform} size={12} className="rounded-sm" />
                            </div>

                            {/* Event details block */}
                            <div className="space-y-1 bg-muted/10 border border-border/40 hover:border-primary/30 rounded-xl p-3.5 transition-colors">
                                <div className="flex items-center justify-between gap-2">
                                    <span className={cn(
                                        "text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                                        isPublished && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                        event.status === "Scheduled" && "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                        event.status === "Draft" && "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
                                        isFailed && "bg-red-500/10 text-red-500 border-red-500/20",
                                        event.status === "Processing" && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                                        event.status === "Deleted" && "bg-zinc-500/10 text-zinc-500 border-zinc-500/20 opacity-60"
                                    )}>
                                        {event.status}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground/60">{event.destination}</span>
                                </div>

                                <p className="text-xs font-bold text-foreground">
                                    {event.platform} post: <span className="font-normal text-muted-foreground">{event.title}</span>
                                </p>
                                
                                {isFailed && event.errorLog && (
                                    <p className="text-[10px] text-red-500 bg-red-500/5 rounded p-1 border border-red-500/10 mt-1.5 font-medium truncate max-w-md">
                                        {event.errorLog}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
