"use client"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal, Play, Sparkles, Copy, FileEdit, RefreshCw, Trash2, Link, ShieldAlert, ArrowUpRight, BarChart2 } from "lucide-react"
import type { HistoryEvent } from "../data/historyData"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

interface ActivityListViewProps {
    events: HistoryEvent[]
    onSelectEvent: (event: HistoryEvent) => void
    onRetryEvent: (eventId: string) => void
    onDuplicateEvent: (event: HistoryEvent) => void
    onDeleteEvent: (eventId: string) => void
}

// ─── Three-dot hover action menu ──────────────────────────────────────────────

function EventActionMenu({
    event,
    onRetry,
    onDuplicate,
    onDelete,
    onSelect
}: {
    event: HistoryEvent
    onRetry: (id: string) => void
    onDuplicate: (e: HistoryEvent) => void
    onDelete: (id: string) => void
    onSelect: (e: HistoryEvent) => void
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <div className="relative" ref={ref} onClick={(e) => e.stopPropagation()}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-7 h-7 rounded-lg border border-border/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-all shrink-0"
            >
                <MoreHorizontal size={13} />
            </button>

            {open && (
                <div className="absolute right-0 top-8 z-30 w-40 rounded-xl border border-border/80 bg-popover shadow-xl p-1 animate-in fade-in slide-in-from-top-1 duration-150 text-xs">
                    <button onClick={() => { onSelect(event); setOpen(false) }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-accent text-foreground text-left transition-colors">
                        <ArrowUpRight size={12} className="text-muted-foreground" /> View Details
                    </button>
                    <button onClick={() => { onDuplicate(event); setOpen(false) }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-accent text-foreground text-left transition-colors">
                        <Copy size={12} className="text-muted-foreground" /> Duplicate Post
                    </button>
                    {event.status === "Failed" && (
                        <button onClick={() => { onRetry(event.id); setOpen(false) }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-accent text-foreground text-left transition-colors">
                            <RefreshCw size={12} className="text-muted-foreground" /> Retry Post
                        </button>
                    )}
                    {event.status === "Draft" && (
                        <button onClick={() => { onSelect(event); setOpen(false) }}
                            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-accent text-foreground text-left transition-colors">
                            <FileEdit size={12} className="text-muted-foreground" /> Edit Draft
                        </button>
                    )}
                    <div className="h-px bg-border/40 my-1" />
                    <button onClick={() => { onDelete(event.id); setOpen(false) }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 text-red-500 text-left transition-colors font-medium">
                        <Trash2 size={12} className="text-red-500/80" /> Delete Activity
                    </button>
                </div>
            )}
        </div>
    )
}

// ─── Main ActivityListView ────────────────────────────────────────────────────

export function ActivityListView({
    events,
    onSelectEvent,
    onRetryEvent,
    onDuplicateEvent,
    onDeleteEvent
}: ActivityListViewProps) {
    return (
        <div className="border border-border/60 rounded-2xl bg-card overflow-hidden shadow-sm divide-y divide-border/40">
            {events.map((event) => {
                const isFailed = event.status === "Failed"
                const hasEngagement = event.status === "Published" && event.engagement

                // Mapped status badge style
                const getStatusStyle = () => {
                    switch (event.status) {
                        case "Published":  return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        case "Scheduled":  return "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        case "Draft":      return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                        case "Failed":     return "bg-red-500/10 text-red-500 border-red-500/20"
                        case "Processing": return "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        case "Deleted":    return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20 opacity-60"
                    }
                }

                return (
                    <div
                        key={event.id}
                        onClick={() => onSelectEvent(event)}
                        className={cn(
                            "relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-4.5 hover:bg-muted/10 transition-all duration-150 cursor-pointer group",
                            isFailed && "border-l-2 border-l-red-500"
                        )}
                    >
                        {/* Info details */}
                        <div className="flex items-start gap-3.5 min-w-0 flex-1">
                            {/* Platform logo */}
                            <div className="shrink-0 relative">
                                <PlatformIcon name={event.platform} size={36} className="shadow-sm rounded-lg" />
                                {event.thumbnailUrl && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded overflow-hidden border border-background shadow">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={event.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Caption details */}
                            <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-xs font-bold text-foreground truncate">{event.title}</h4>
                                    <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full border", getStatusStyle())}>
                                        {event.status}
                                    </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground line-clamp-1 leading-normal">
                                    {event.caption}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 flex-wrap font-medium">
                                    <span>{event.destination}</span>
                                    <span>•</span>
                                    <span>{event.timestamp}</span>
                                </div>
                            </div>
                        </div>

                        {/* Staged metrics / engagement */}
                        {hasEngagement && event.engagement && (
                            <div className="flex items-center gap-4 shrink-0 text-[10px] text-muted-foreground bg-muted/20 border border-border/40 rounded-xl px-3 py-1.5 max-w-fit font-medium">
                                <div className="text-center">
                                    <p className="text-[9px] text-muted-foreground/60 uppercase">Likes</p>
                                    <p className="font-bold text-foreground mt-0.5">{event.engagement.likes}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] text-muted-foreground/60 uppercase">Replies</p>
                                    <p className="font-bold text-foreground mt-0.5">{event.engagement.comments}</p>
                                </div>
                                <div className="text-center text-xs text-emerald-500 font-bold self-center flex items-center gap-0.5 ml-1">
                                    <BarChart2 size={10} /> +4.2%
                                </div>
                            </div>
                        )}

                        {/* Error info banner */}
                        {isFailed && (
                            <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/5 text-[10px] text-red-500 max-w-fit font-medium">
                                <ShieldAlert size={12} className="shrink-0" />
                                <span className="truncate max-w-[120px]" title={event.errorLog}>{event.errorLog}</span>
                            </div>
                        )}

                        {/* Action buttons (reveals fully on hover desktop, always visible on mobile) */}
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center" onClick={(e) => e.stopPropagation()}>
                            {isFailed ? (
                                <button
                                    type="button"
                                    onClick={() => onRetryEvent(event.id)}
                                    className="h-7 px-3.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[11px] font-semibold transition-all shadow-sm flex items-center gap-1"
                                >
                                    <RefreshCw size={10} /> Retry
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onSelectEvent(event)}
                                    className="h-7 px-3.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-[11px] font-semibold transition-all"
                                >
                                    Details
                                </button>
                            )}
                            <EventActionMenu
                                event={event}
                                onRetry={onRetryEvent}
                                onDuplicate={onDuplicateEvent}
                                onDelete={onDeleteEvent}
                                onSelect={onSelectEvent}
                            />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
