"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

interface PanelProps {
    onChange: () => void
}

export function NotificationsPanel({ onChange }: PanelProps) {
    const [pubSuccess, setPubSuccess] = useState(true)
    const [pubFailed, setPubFailed] = useState(true)
    const [weeklyStats, setWeeklyStats] = useState(true)
    const [securityAlerts, setSecurityAlerts] = useState(true)
    const [prodUpdates, setProdUpdates] = useState(false)

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            <div>
                <h3 className="text-sm font-bold text-foreground">Notifications & Alerts</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Control where and when you receive alerts for your account and workspace activity.</p>
            </div>
            <div className="h-px bg-border/40" />

            <div className="space-y-4 text-xs max-w-md">
                
                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">Publishing Success alerts</p>
                        <p className="text-[10px] text-muted-foreground">Receive push/email confirmations when scheduled updates are posted successfully.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setPubSuccess(!pubSuccess); onChange() }}
                        className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${pubSuccess ? "bg-primary" : "bg-muted"}`}
                        style={{ height: "18px" }}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${pubSuccess && "translate-x-3.5"}`} />
                    </button>
                </label>

                <div className="h-px bg-border/30" />

                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-red-500">Publishing Failed alerts</p>
                        <p className="text-[10px] text-muted-foreground">Receive high priority emails if any scheduled queues fail to publish.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setPubFailed(!pubFailed); onChange() }}
                        className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${pubFailed ? "bg-primary" : "bg-muted"}`}
                        style={{ height: "18px" }}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${pubFailed && "translate-x-3.5"}`} />
                    </button>
                </label>

                <div className="h-px bg-border/30" />

                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">Weekly analytics digest</p>
                        <p className="text-[10px] text-muted-foreground">Email report containing channel performance, delta growths and engagement deltas.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setWeeklyStats(!weeklyStats); onChange() }}
                        className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${weeklyStats ? "bg-primary" : "bg-muted"}`}
                        style={{ height: "18px" }}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${weeklyStats && "translate-x-3.5"}`} />
                    </button>
                </label>

                <div className="h-px bg-border/30" />

                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">Security & Login notifications</p>
                        <p className="text-[10px] text-muted-foreground">Immediate warnings when a new session is authorized or keys are generated.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setSecurityAlerts(!securityAlerts); onChange() }}
                        className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${securityAlerts ? "bg-primary" : "bg-muted"}`}
                        style={{ height: "18px" }}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${securityAlerts && "translate-x-3.5"}`} />
                    </button>
                </label>

                <div className="h-px bg-border/30" />

                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">Product feature updates</p>
                        <p className="text-[10px] text-muted-foreground">Periodic newsletters showing new integrations, templates, and core layouts guides.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setProdUpdates(!prodUpdates); onChange() }}
                        className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${prodUpdates ? "bg-primary" : "bg-muted"}`}
                        style={{ height: "18px" }}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${prodUpdates && "translate-x-3.5"}`} />
                    </button>
                </label>

            </div>

            <div className="pt-2 flex justify-end">
                <button type="submit" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all">
                    Save Notification Rules
                </button>
            </div>
        </div>
    )
}
