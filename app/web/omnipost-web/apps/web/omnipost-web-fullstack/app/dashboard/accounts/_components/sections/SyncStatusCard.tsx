"use client"

import { useState } from "react"
import { RefreshCcw, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react"
import { SYNC_STATUS_MOCK } from "../data/mockData"
import { PanelCard } from "../ui/PanelCard"
import { cn } from "@/lib/utils"

export function SyncStatusCard() {
    const [syncing, setSyncing] = useState(false)
    const [progress, setProgress] = useState(SYNC_STATUS_MOCK.progress)
    const [showLogs, setShowLogs] = useState(false)

    const handleRetry = () => {
        setSyncing(true)
        setProgress(0)
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval)
                    setSyncing(false)
                    return 100
                }
                return p + 10
            })
        }, 150)
    }

    return (
        <PanelCard title="Sync Engine Status" icon={<RefreshCcw size={13} className={cn(syncing && "animate-spin")} />}>
            <div className="px-4 py-3.5 space-y-4">
                
                {/* Visual Progress bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground font-semibold">Engine Feed Stream</span>
                        <span className="font-bold text-foreground">{progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-300",
                                syncing ? "bg-primary" : "bg-emerald-500"
                            )}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Queue Summary Grid */}
                <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-border/40 text-center text-xs">
                    <div className="space-y-0.5">
                        <p className="text-[10px] text-muted-foreground font-medium">Queued</p>
                        <p className="text-sm font-bold text-foreground">{syncing ? 0 : SYNC_STATUS_MOCK.queued}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-[10px] text-muted-foreground font-medium">Completed</p>
                        <p className="text-sm font-bold text-emerald-500">{syncing ? 48 : SYNC_STATUS_MOCK.completed}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-[10px] text-muted-foreground font-medium">Failed</p>
                        <p className="text-sm font-bold text-red-500">{syncing ? 0 : SYNC_STATUS_MOCK.failed}</p>
                    </div>
                </div>

                {/* Sync Action Button */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        disabled={syncing}
                        onClick={handleRetry}
                        className="flex-1 h-8 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/95 flex items-center justify-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
                    >
                        <RefreshCcw size={11} className={cn(syncing && "animate-spin")} />
                        {syncing ? "Syncing..." : "Sync Feeds"}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => setShowLogs(!showLogs)}
                        className="h-8 px-3 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                        {showLogs ? "Hide Logs" : "View Logs"}
                    </button>
                </div>

                {/* Collapsible logs list */}
                {showLogs && (
                    <div className="space-y-2 pt-2 border-t border-border/40 animate-in fade-in slide-in-from-top-1 duration-200">
                        {SYNC_STATUS_MOCK.recentHistory.map((h, i) => (
                            <div key={i} className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground font-medium">{h.platform}</span>
                                <div className="flex items-center gap-1.5 text-[10px]">
                                    <span>{h.time}</span>
                                    {h.status === "completed" ? (
                                        <CheckCircle2 size={11} className="text-emerald-500" />
                                    ) : (
                                        <AlertCircle size={11} className="text-red-500" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <p className="text-[10px] text-muted-foreground/60 text-center">Last global sync check: Just now</p>
            </div>
        </PanelCard>
    )
}
