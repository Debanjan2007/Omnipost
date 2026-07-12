"use client"

import { X, CheckCircle2, AlertTriangle, ShieldCheck, Activity, Globe, RefreshCcw, Copy, FileEdit, Database, Code } from "lucide-react"
import type { HistoryEvent } from "../data/historyData"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

interface EventDetailsPanelProps {
    event: HistoryEvent
    onClose: () => void
    onRetry: (id: string) => void
    onDuplicate: (e: HistoryEvent) => void
}

export function EventDetailsPanel({ event, onClose, onRetry, onDuplicate }: EventDetailsPanelProps) {
    const isFailed = event.status === "Failed"
    const isScheduled = event.status === "Scheduled"
    const isDraft = event.status === "Draft"

    return (
        <div className="h-full flex flex-col bg-card border-l border-border animate-in slide-in-from-right duration-250 w-full lg:w-[380px] xl:w-[440px] shrink-0 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <PlatformIcon name={event.platform} size={20} className="rounded" />
                    <h3 className="text-xs font-bold text-foreground">Post Diagnostics</h3>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X size={14} />
                </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                
                {/* Visual Preview Frame */}
                {event.thumbnailUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-border/60 aspect-[16/9] bg-muted flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={event.thumbnailUrl} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2">
                            <PlatformIcon name={event.platform} size={24} className="shadow-md rounded-lg" />
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-border/60 bg-muted/10 p-4 text-xs text-muted-foreground italic text-center">
                        No media attachments for this post.
                    </div>
                )}

                {/* Caption Details */}
                <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Caption content</h5>
                    <div className="p-3.5 rounded-xl border border-border/60 bg-muted/10 text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                        {event.caption}
                    </div>
                </div>

                {/* Status-specific warning block */}
                {isFailed && event.errorLog && (
                    <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2">
                        <div className="flex items-center gap-2 text-red-500 font-semibold text-xs">
                            <AlertTriangle size={13} className="shrink-0" />
                            <span>Publishing Error Logs</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium leading-relaxed font-mono whitespace-pre-wrap">
                            {event.errorLog}
                        </p>
                        <button
                            onClick={() => onRetry(event.id)}
                            className="w-full h-7 text-xs font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
                        >
                            <RefreshCcw size={11} /> Retry Publishing Now
                        </button>
                    </div>
                )}

                {/* Publish Metadata */}
                <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">OAuth Status</h5>
                    <div className="rounded-xl border border-border/60 bg-muted/10 divide-y divide-border/40 text-xs">
                        <div className="flex justify-between p-2.5">
                            <span className="text-muted-foreground">Author</span>
                            <span className="font-semibold text-foreground">{event.author}</span>
                        </div>
                        <div className="flex justify-between p-2.5">
                            <span className="text-muted-foreground">Channel destination</span>
                            <span className="font-semibold text-foreground">{event.destination}</span>
                        </div>
                        {event.publishingDuration && (
                            <div className="flex justify-between p-2.5">
                                <span className="text-muted-foreground">Publishing latency</span>
                                <span className="font-semibold text-foreground">{event.publishingDuration}</span>
                            </div>
                        )}
                        <div className="flex justify-between p-2.5">
                            <span className="text-muted-foreground">Webhook status</span>
                            <span className="font-semibold text-foreground flex items-center gap-1.5">
                                <span className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    event.webhookStatus === "active" ? "bg-emerald-500" : "bg-red-500"
                                )} />
                                {event.webhookStatus === "active" ? "Connected" : "Disconnected"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Time timeline */}
                <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5">
                        <Activity size={13} className="text-muted-foreground" />
                        <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Publishing lifecycle</h5>
                    </div>
                    <div className="relative border-l border-border ml-2 pl-4 space-y-4 py-1 text-xs">
                        <div className="relative">
                            <span className="absolute -left-[20px] top-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-card" />
                            <p className="font-semibold text-foreground">Post Created</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{event.createdTime}</p>
                        </div>
                        {event.scheduledTime && (
                            <div className="relative">
                                <span className="absolute -left-[20px] top-0.5 w-2 h-2 rounded-full bg-blue-500 ring-4 ring-card" />
                                <p className="font-semibold text-foreground">Post Scheduled</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{event.scheduledTime}</p>
                            </div>
                        )}
                        {event.publishedTime && (
                            <div className="relative">
                                <span className="absolute -left-[20px] top-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-card" />
                                <p className="font-semibold text-foreground">Post Published</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{event.publishedTime}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* JSON API responses */}
                {event.apiResponse && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <Code size={13} className="text-muted-foreground" />
                            <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">API Response Scopes</h5>
                        </div>
                        <pre className="p-3 rounded-xl border border-border/60 bg-popover/40 text-[10px] font-mono text-muted-foreground overflow-x-auto max-w-full">
                            {JSON.stringify(JSON.parse(event.apiResponse), null, 2)}
                        </pre>
                    </div>
                )}

                {/* Drawer Footer Actions */}
                <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => onDuplicate(event)}
                        className="flex-1 h-8 text-xs font-semibold rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                        <Copy size={11} /> Duplicate Post
                    </button>
                    {isDraft && (
                        <button
                            onClick={() => {}}
                            className="flex-1 h-8 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 transition-all flex items-center justify-center gap-1 shadow-sm"
                        >
                            <FileEdit size={11} /> Edit Draft
                        </button>
                    )}
                </div>

            </div>
        </div>
    )
}
