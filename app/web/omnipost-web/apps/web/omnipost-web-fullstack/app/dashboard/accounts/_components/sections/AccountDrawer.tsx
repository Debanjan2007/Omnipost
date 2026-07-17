"use client"

import { useState } from "react"
import { RefreshCcw, CheckCircle2, AlertTriangle, ShieldCheck, FileText, Database, BarChart3, Clock, XIcon } from "lucide-react"
import type { Account } from "../data/mockData"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"

// ─── Types ────────────────────────────────────────────────────────────────────

type DrawerTab = "overview" | "permissions" | "analytics" | "logs"

interface AccountDrawerProps {
    account: Account | null
    onClose: () => void
    onReconnect: (accountId: string) => void
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabButton({
    id,
    label,
    active,
    onClick,
}: {
    id: DrawerTab
    label: string
    active: boolean
    onClick: () => void
}) {
    return (
        <button
            type="button"
            id={`drawer-tab-${id}`}
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
        >
            {label}
        </button>
    )
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ account, onReconnect }: { account: Account; onReconnect: (id: string) => void }) {
    const isWarning = account.healthStatus === "warning" || account.healthStatus === "error"

    return (
        <div className="space-y-5">
            {/* Profile block */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/20 border border-border/60">
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
                    <p className="text-xs text-muted-foreground">{account.username}</p>
                    <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {account.businessType}
                    </span>
                </div>
            </div>

            {/* Follower stats */}
            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <BarChart3 size={12} className="text-muted-foreground" />
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Audience</h5>
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

            {/* OAuth metadata */}
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
                        <span className="text-muted-foreground">Webhook</span>
                        <span className={cn(
                            "font-semibold capitalize",
                            account.webhookStatus === "active" ? "text-emerald-500" : "text-muted-foreground"
                        )}>
                            {account.webhookStatus}
                        </span>
                    </div>
                    <div className="flex justify-between p-2.5">
                        <span className="text-muted-foreground">Scope Summary</span>
                        <span className="font-medium text-foreground truncate max-w-[160px]" title={account.permissionsSummary}>
                            {account.permissionsSummary}
                        </span>
                    </div>
                </div>
            </div>

            {/* Reconnect CTA if unhealthy */}
            {isWarning && (
                <button
                    type="button"
                    onClick={() => onReconnect(account.id)}
                    className="w-full h-9 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                    <RefreshCcw size={12} />
                    Reauthorize Connection
                </button>
            )}
        </div>
    )
}

// ─── Permissions Tab ──────────────────────────────────────────────────────────

function PermissionsTab({ account }: { account: Account }) {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-muted-foreground" />
                <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Scopes & Grants</h5>
            </div>
            <div className="rounded-xl border border-border/60 overflow-hidden text-xs">
                <div className="divide-y divide-border/40 bg-card">
                    {account.grantedPermissions.map((p) => (
                        <div key={p.name} className="px-3 py-2.5 flex justify-between items-center">
                            <div className="space-y-0.5">
                                <span className="font-medium text-foreground">{p.name}</span>
                                <span className={cn(
                                    "block text-[9px] font-bold uppercase tracking-wider",
                                    p.required ? "text-muted-foreground/60" : "text-muted-foreground/40"
                                )}>
                                    {p.required ? "Required" : "Optional"}
                                </span>
                            </div>
                            {p.granted ? (
                                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                            ) : (
                                <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xs font-bold shrink-0">✗</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Missing required perms callout */}
            {account.grantedPermissions.some(p => p.required && !p.granted) && (
                <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 text-xs text-amber-500 font-medium">
                    Some required permissions are missing. Reconnect this account to restore full publishing access.
                </div>
            )}
        </div>
    )
}

// ─── Analytics Tab ────────────────────────────────────────────────────────────

function AnalyticsTab({ account }: { account: Account }) {
    const mockPublishes = [
        { time: "2 hours ago", title: "Launch of OmniPost Web Beta 🚀", reach: "1.2K views" },
        { time: "Yesterday", title: "Designing SaaS layouts under 60 seconds", reach: "892 impressions" },
        { time: "3 days ago", title: "Why NextJS loading templates are key for UX", reach: "2.4K reach" },
    ]

    return (
        <div className="space-y-5">
            {/* Stat summary strip */}
            <div className="grid grid-cols-3 gap-2 text-center">
                {[
                    { label: "Followers", value: account.followerCount },
                    { label: "Posts", value: "142" },
                    { label: "Growth", value: "+4.2%" },
                ].map(s => (
                    <div key={s.label} className="bg-muted/20 border border-border/60 rounded-xl p-3">
                        <p className="text-[10px] text-muted-foreground">{s.label}</p>
                        <p className="text-sm font-bold text-foreground mt-0.5">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent publishes */}
            <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                    <FileText size={12} className="text-muted-foreground" />
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Recent Publishes</h5>
                </div>
                <div className="space-y-2">
                    {mockPublishes.map((pub, idx) => (
                        <div key={idx} className="p-3 rounded-xl border border-border/60 bg-card space-y-1.5 text-xs hover:bg-muted/10 transition-colors">
                            <div className="flex justify-between items-center gap-2 text-muted-foreground text-[10px]">
                                <span className="flex items-center gap-1"><Clock size={9} /> {pub.time}</span>
                                <span className="font-medium text-foreground">{pub.reach}</span>
                            </div>
                            <p className="font-semibold text-foreground/90 truncate">{pub.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─── Logs Tab ─────────────────────────────────────────────────────────────────

function LogsTab({ account }: { account: Account }) {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-1.5">
                <Database size={12} className="text-muted-foreground" />
                <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Connection Logs</h5>
            </div>
            <div className="space-y-2">
                {account.syncLogs.map((log, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-border/60 bg-card text-xs gap-3">
                        <div className="space-y-0.5 min-w-0">
                            <p className="font-semibold text-foreground truncate">{log.event}</p>
                            <p className="text-[10px] text-muted-foreground">{log.time}</p>
                        </div>
                        <span className={cn(
                            "text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0",
                            log.status === "success"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : "bg-red-500/10 text-red-500"
                        )}>
                            {log.status === "success" ? "Success" : "Failed"}
                        </span>
                    </div>
                ))}
            </div>
            {account.syncLogs.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-6">No sync logs available.</p>
            )}
        </div>
    )
}

// ─── AccountDrawer ────────────────────────────────────────────────────────────

export function AccountDrawer({ account, onClose, onReconnect }: AccountDrawerProps) {
    const [activeTab, setActiveTab] = useState<DrawerTab>("overview")

    const tabs: { id: DrawerTab; label: string }[] = [
        { id: "overview",     label: "Overview" },
        { id: "permissions",  label: "Permissions" },
        { id: "analytics",    label: "Analytics" },
        { id: "logs",         label: "Logs" },
    ]

    return (
        <Sheet open={!!account} onOpenChange={(open) => { if (!open) onClose() }}>
            <SheetContent
                side="right"
                showCloseButton={false}
                className="w-full sm:max-w-[440px] p-0 flex flex-col gap-0 border-l border-border bg-card"
            >
                {account && (
                    <>
                        {/* Drawer Header */}
                        <SheetHeader className="px-5 py-4 border-b border-border/60 shrink-0 gap-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <PlatformIcon name={account.platform} size={20} className="rounded-lg shadow-sm" />
                                    <div>
                                        <SheetTitle className="text-sm font-bold text-foreground leading-none">
                                            {account.name}
                                        </SheetTitle>
                                        <SheetDescription className="text-[11px] text-muted-foreground mt-0.5">
                                            {account.username} · {account.platform}
                                        </SheetDescription>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                                    aria-label="Close drawer"
                                >
                                    <XIcon size={14} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center gap-1 mt-3 -mb-1">
                                {tabs.map(tab => (
                                    <TabButton
                                        key={tab.id}
                                        id={tab.id}
                                        label={tab.label}
                                        active={activeTab === tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                    />
                                ))}
                            </div>
                        </SheetHeader>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-5">
                            {activeTab === "overview"    && <OverviewTab    account={account} onReconnect={onReconnect} />}
                            {activeTab === "permissions" && <PermissionsTab account={account} />}
                            {activeTab === "analytics"   && <AnalyticsTab   account={account} />}
                            {activeTab === "logs"        && <LogsTab        account={account} />}
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}
