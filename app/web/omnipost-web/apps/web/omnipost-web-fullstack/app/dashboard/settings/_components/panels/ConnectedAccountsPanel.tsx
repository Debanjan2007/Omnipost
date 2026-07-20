"use client"

import { Share2, Wifi, AlertTriangle } from "lucide-react"

export function ConnectedAccountsPanel() {
    const platforms = [
        { name: "Instagram", user: "@omnipost_hub", active: true },
        { name: "LinkedIn", user: "in/debanjan-dey", active: true },
        { name: "Twitter/X", user: "@debanjan_x", active: false, warning: "Expired Token" }
    ]

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            <div>
                <h3 className="text-sm font-bold text-foreground">Linked Accounts</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Summary of currently authorized publishing feeds.</p>
            </div>
            <div className="h-px bg-border/40" />

            <div className="space-y-3 text-xs">
                {platforms.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/10">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-foreground">{p.name}</span>
                            <span className="text-muted-foreground text-[11px]">{p.user}</span>
                        </div>
                        <div>
                            {p.active ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                    <Wifi size={8} /> Active
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                    <AlertTriangle size={8} /> {p.warning}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
                <p className="text-[10px] text-muted-foreground">Manage full configurations under Accounts panel</p>
                <a href="/dashboard/accounts" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5">
                    <Share2 size={12} /> Go to Accounts
                </a>
            </div>
        </div>
    )
}
