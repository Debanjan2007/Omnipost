"use client"

import { X, CheckCircle2, AlertTriangle, ShieldCheck, Activity, Globe, RefreshCcw, Database, FileText, BarChart3, Clock } from "lucide-react"
import type { Account } from "../data/mockData"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

interface AccountDetailsPanelProps {
    account: Account
    onClose: () => void
    onReconnect: (accountId: string) => void
}

export function AccountDetailsPanel({ account, onClose, onReconnect }: AccountDetailsPanelProps) {
    const isWarning = account.healthStatus === "warning" || account.healthStatus === "error"

    // Mock recent publishes based on platform
    const mockPublishes = [
        { time: "2 hours ago", title: "Launch of OmniPost Web Beta 🚀", reach: "1.2K views" },
        { time: "Yesterday", title: "Designing SaaS layouts under 60 seconds", reach: "892 impressions" },
        { time: "3 days ago", title: "Why NextJS loading templates are key for UX", reach: "2.4K reach" }
    ]

    return (
        <div className="h-full flex flex-col bg-card border-l border-border animate-in slide-in-from-right duration-250 w-full lg:w-[380px] xl:w-[440px] shrink-0 shadow-2xl">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <PlatformIcon name={account.platform} size={20} className="rounded" />
                    <h3 className="text-xs font-bold text-foreground">Connection Details</h3>
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
                
                {/* Profile block */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/20 border border-border/60 relative">
                    <div className="relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={account.avatarUrl}
                            alt={account.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-border/40 bg-muted"
                        />
                        <div className="absolute -bottom-1 -right-1">
                            <PlatformIcon name={account.platform} size={18} className="shadow-md rounded-md" />
                        </div>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-sm font-bold text-foreground truncate">{account.name}</h4>
                            {account.verified && (
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-500 fill-current shrink-0">
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{account.username}</p>
                        <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {account.businessType}
                        </span>
                    </div>
                </div>

                {/* Follower Analytics */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <BarChart3 size={13} className="text-muted-foreground" />
                        <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Audience Reach</h5>
                    </div>
                    <div className="grid grid-cols-2 gap-2 bg-muted/10 border border-border/60 rounded-xl p-3.5 text-xs">
                        <div>
                            <p className="text-muted-foreground text-[10px]">Followers</p>
                            <p className="text-sm font-bold text-foreground mt-0.5">{account.followerCount}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-[10px]">Growth Delta</p>
                            <p className="text-sm font-bold text-emerald-500 mt-0.5">+4.2% this week</p>
                        </div>
                    </div>
                </div>

                {/* OAuth & Token Metadata */}
                <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">OAuth Authorization</h5>
                    <div className="rounded-xl border border-border/60 bg-muted/10 divide-y divide-border/40 text-xs">
                        <div className="flex justify-between p-2.5">
                            <span className="text-muted-foreground">Connected since</span>
                            <span className="font-semibold text-foreground">{account.connectedSince}</span>
                        </div>
                        <div className="flex justify-between p-2.5">
                            <span className="text-muted-foreground">API Version</span>
                            <span className="font-mono text-foreground font-semibold">{account.apiVersion}</span>
                        </div>
                        <div className="flex justify-between p-2.5">
                            <span className="text-muted-foreground">Token Status</span>
                            <span className={cn(
                                "font-semibold flex items-center gap-1",
                                isWarning ? "text-amber-500" : "text-emerald-500"
                            )}>
                                {isWarning ? <AlertTriangle size={11} /> : <CheckCircle2 size={11} />}
                                {account.tokenExpiry}
                            </span>
                        </div>
                        <div className="flex justify-between p-2.5">
                            <span className="text-muted-foreground">Scope Summary</span>
                            <span className="font-medium text-foreground truncate max-w-[200px]" title={account.permissionsSummary}>
                                {account.permissionsSummary}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Permissions matrix */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck size={13} className="text-muted-foreground" />
                        <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Scopes & Grants</h5>
                    </div>
                    <div className="rounded-xl border border-border/60 overflow-hidden text-xs">
                        <div className="divide-y divide-border/40 bg-card">
                            {account.grantedPermissions.map((p) => (
                                <div key={p.name} className="px-3 py-2.5 flex justify-between items-center">
                                    <span className="font-medium text-foreground">{p.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-bold text-muted-foreground/60">
                                            {p.required ? "REQUIRED" : "OPTIONAL"}
                                        </span>
                                        {p.granted ? (
                                            <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">✓</span>
                                        ) : (
                                            <span className="w-5 h-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold">✗</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Publishes */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <FileText size={13} className="text-muted-foreground" />
                        <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Recent Publishes</h5>
                    </div>
                    <div className="space-y-2">
                        {mockPublishes.map((pub, idx) => (
                            <div key={idx} className="p-3 rounded-xl border border-border/60 bg-card space-y-1.5 text-xs">
                                <div className="flex justify-between items-center gap-2 text-muted-foreground text-[10px]">
                                    <span className="flex items-center gap-1"><Clock size={9} /> {pub.time}</span>
                                    <span className="font-medium text-foreground">{pub.reach}</span>
                                </div>
                                <p className="font-bold text-foreground/90 truncate">{pub.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sync Logs */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <Database size={13} className="text-muted-foreground" />
                        <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Connection Logs</h5>
                    </div>
                    <div className="space-y-2">
                        {account.syncLogs.map((log, i) => (
                            <div key={i} className="flex justify-between items-center p-2.5 rounded-xl border border-border/60 bg-card text-xs">
                                <div className="space-y-0.5">
                                    <p className="font-semibold text-foreground">{log.event}</p>
                                    <p className="text-[10px] text-muted-foreground">{log.time}</p>
                                </div>
                                <span className={cn(
                                    "text-[9px] font-semibold px-2 py-0.5 rounded-full",
                                    log.status === "success"
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-red-500/12 text-red-500"
                                )}>
                                    {log.status === "success" ? "Success" : "Failed"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
