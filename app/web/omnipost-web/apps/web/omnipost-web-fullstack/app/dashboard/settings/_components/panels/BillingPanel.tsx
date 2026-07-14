"use client"

import { MOCK_BILLING } from "../data/settingsData"
import { CreditCard, ArrowUpRight, DollarSign } from "lucide-react"

export function BillingPanel() {
    const b = MOCK_BILLING

    return (
        <div className="space-y-5">
            {/* Plan Info Card */}
            <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h3 className="text-sm font-bold text-foreground">Plan & Subscription</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{b.billingCycle}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        {b.plan}
                    </span>
                </div>
                <div className="h-px bg-border/40" />

                {/* Usage progress parameters */}
                <div className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-muted-foreground">{b.usage.posts.label}</span>
                            <span className="font-bold text-foreground">{b.usage.posts.current} / {b.usage.posts.limit}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${(b.usage.posts.current / b.usage.posts.limit) * 100}%` }} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-muted-foreground">{b.usage.accounts.label}</span>
                            <span className="font-bold text-foreground">{b.usage.accounts.current} / {b.usage.accounts.limit}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${(b.usage.accounts.current / b.usage.accounts.limit) * 100}%` }} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-muted-foreground">{b.usage.aiWords.label}</span>
                            <span className="font-bold text-foreground">{b.usage.aiWords.current} / {b.usage.aiWords.limit}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${(b.usage.aiWords.current / b.usage.aiWords.limit) * 100}%` }} />
                        </div>
                    </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                    <p className="text-[10px] text-muted-foreground">Premium features renew monthly</p>
                    <button type="button" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5">
                        Upgrade Subscription <ArrowUpRight size={12} />
                    </button>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
                <div>
                    <h3 className="text-sm font-bold text-foreground">Billing History</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">View and download your past receipt invoices logs.</p>
                </div>
                <div className="h-px bg-border/40" />

                <div className="space-y-3.5 text-xs">
                    {b.invoices.map((inv, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/10">
                            <div className="space-y-0.5">
                                <p className="font-semibold text-foreground">{inv.id}</p>
                                <p className="text-[10px] text-muted-foreground">{inv.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-foreground">{inv.amount}</span>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                    {inv.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
