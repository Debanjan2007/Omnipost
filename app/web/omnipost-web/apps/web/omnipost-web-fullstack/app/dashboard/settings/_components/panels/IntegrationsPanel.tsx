"use client"

import { useState } from "react"
import { MOCK_INTEGRATIONS } from "../data/settingsData"
import { Settings2 } from "lucide-react"

export function IntegrationsPanel() {
    const [integrations, setIntegrations] = useState(MOCK_INTEGRATIONS)

    const handleToggle = (id: string) => {
        setIntegrations(prev => prev.map(int => {
            if (int.id === id) {
                return { ...int, connected: !int.connected }
            }
            return int
        }))
    }

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            <div>
                <h3 className="text-sm font-bold text-foreground">App Integrations</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Extend your workflow by syncing media, scheduling queues, or posting logs to external applications.</p>
            </div>
            <div className="h-px bg-border/40" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((int) => (
                    <div
                        key={int.id}
                        className="p-4 rounded-xl border border-border/60 bg-muted/10 flex flex-col justify-between h-40 space-y-3"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl shrink-0 leading-none">{int.logo}</span>
                                    <span className="text-xs font-bold text-foreground">{int.name}</span>
                                </div>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-0.5 ${
                                    int.connected
                                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                        : "bg-muted text-muted-foreground border-border/40"
                                }`}>
                                    {int.connected ? "Connected" : "Off"}
                                </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-normal line-clamp-2">
                                {int.desc}
                            </p>
                        </div>

                        {/* Integration footer actions */}
                        <div className="flex gap-2">
                            {int.connected ? (
                                <>
                                    <button type="button" className="flex-1 h-7 rounded-lg border border-border bg-card text-foreground hover:bg-muted text-[10px] font-semibold transition-all flex items-center justify-center gap-1">
                                        <Settings2 size={11} /> Config
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(int.id)}
                                        className="h-7 px-3.5 rounded-lg border border-red-500/20 hover:border-red-500/40 text-red-500 hover:bg-red-500/5 text-[10px] font-semibold transition-all"
                                    >
                                        Disconnect
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleToggle(int.id)}
                                    className="w-full h-7 rounded-lg bg-primary text-primary-foreground hover:bg-primary/95 text-[10px] font-semibold transition-all shadow-sm"
                                >
                                    Link App
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
