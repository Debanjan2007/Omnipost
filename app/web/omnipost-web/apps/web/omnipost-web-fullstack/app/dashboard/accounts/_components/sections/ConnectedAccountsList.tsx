"use client"

import { useState, useEffect, useRef } from "react"
import { MoreHorizontal, RefreshCcw, Trash2, Database } from "lucide-react"
import { toast } from "sonner"
import type { Account } from "../data/mockData"
import type { ProviderConfig } from "../data/providersConfig"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

export type AccountCardItem = 
    | { type: "connected"; account: Account }
    | { type: "unconnected"; provider: ProviderConfig }

interface ConnectedAccountsListProps {
    items: AccountCardItem[]
    onSelectAccount: (account: Account) => void
    onOpenLogs: (account: Account) => void
    onReconnect: (accountId: string) => void
    onDisconnect: (accountId: string) => void
    onConnectPlatform: (oauthPath?: string) => void
}

// ─── Card Action Menu ─────────────────────────────────────────────────────────

function CardActionMenu({
    account,
    onReconnect,
    onDisconnect,
    onOpenLogs,
}: {
    account: Account
    onReconnect: (id: string) => void
    onDisconnect: (id: string) => void
    onOpenLogs: (acc: Account) => void
}) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-border/60 bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all shrink-0"
                aria-label="Account actions"
            >
                <MoreHorizontal size={14} />
            </button>

            {open && (
                <div className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-xl p-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                        type="button"
                        onClick={() => { onReconnect(account.id); setOpen(false) }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground text-left transition-colors font-medium text-foreground"
                    >
                        <RefreshCcw size={12} className="text-muted-foreground" />
                        Reconnect
                    </button>
                    <button
                        type="button"
                        onClick={() => { onOpenLogs(account); setOpen(false) }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground text-left transition-colors font-medium text-foreground"
                    >
                        <Database size={12} className="text-muted-foreground" />
                        View Logs
                    </button>
                    <div className="h-px bg-border/40 my-1" />
                    <button
                        type="button"
                        onClick={() => { onDisconnect(account.id); setOpen(false) }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-red-500/10 text-red-500 text-left transition-colors font-medium"
                    >
                        <Trash2 size={12} className="text-red-500/70" />
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    )
}

// ─── Status Pill ──────────────────────────────────────────────────────────────

function getStatusPill(account: Account) {
    if (account.connectedStatus === "disconnected") {
        return { label: "Disconnected", style: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" }
    }
    if (account.healthStatus === "error") {
        return { label: "Failed", style: "bg-red-500/10 text-red-500 border-red-500/20" }
    }
    if (account.healthStatus === "warning") {
        return { label: "Needs Reauth", style: "bg-amber-500/10 text-amber-500 border-amber-500/20" }
    }
    return { label: "Connected", style: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" }
}

// ─── ConnectedAccountsList ────────────────────────────────────────────────────

export function ConnectedAccountsList({
    items,
    onSelectAccount,
    onOpenLogs,
    onReconnect,
    onDisconnect,
    onConnectPlatform,
}: ConnectedAccountsListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => {
                if (item.type === "unconnected") {
                    const { provider } = item
                    return (
                        <div
                            key={`unconnected-${provider.key}`}
                            className={cn(
                                "group bg-card border border-border/60 rounded-2xl p-5",
                                "hover:border-border hover:shadow-md transition-all duration-200",
                                "flex flex-col gap-4"
                            )}
                        >
                            {/* Top row: Platform Icon + Not Connected badge */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="relative shrink-0">
                                    {provider.icon({ size: 44, className: "rounded-xl" })}
                                </div>

                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 mt-0.5 bg-zinc-500/10 text-zinc-500 border-zinc-500/20">
                                    Not Connected
                                </span>
                            </div>

                            {/* Platform name */}
                            <div className="min-w-0 -mt-1">
                                <h4 className="text-sm font-semibold text-foreground truncate leading-tight">
                                    {provider.name}
                                </h4>
                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                    Connect your {provider.name} account
                                </p>
                            </div>

                            {/* Connect / Coming soon Button */}
                            <div className="mt-auto pt-3 border-t border-border/40">
                                {provider.enabled ? (
                                    <button
                                        type="button"
                                        onClick={() => onConnectPlatform(provider.oauthPath)}
                                        className="w-full inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/95 transition-all shadow-sm cursor-pointer"
                                    >
                                        Connect
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => toast.error("This provider is not available yet.")}
                                        className="w-full inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-xl bg-muted text-muted-foreground border border-border/50 text-xs font-semibold cursor-not-allowed"
                                    >
                                        Coming Soon
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                }

                const { account } = item
                const statusPill = getStatusPill(account)

                return (
                    <div
                        key={account.id}
                        onClick={() => onSelectAccount(account)}
                        className={cn(
                            "group bg-card border border-border/60 rounded-2xl p-5 cursor-pointer",
                            "hover:border-border hover:shadow-md transition-all duration-200",
                            "flex flex-col gap-4"
                        )}
                    >
                        {/* Top row: avatar + status badge */}
                        <div className="flex items-start justify-between gap-2">
                            {/* Avatar with platform icon */}
                            <div className="relative shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={account.avatarUrl}
                                    alt={account.name}
                                    className="w-11 h-11 rounded-full object-cover ring-2 ring-border/40 bg-muted"
                                />
                                <div className="absolute -bottom-1 -right-1">
                                    <PlatformIcon name={account.platform} size={18} className="shadow-md rounded-md" />
                                </div>
                            </div>

                            {/* Status badge */}
                            <span className={cn(
                                "text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 mt-0.5",
                                statusPill.style
                            )}>
                                {statusPill.label}
                            </span>
                        </div>

                        {/* Name + username */}
                        <div className="min-w-0 -mt-1">
                            <h4 className="text-sm font-semibold text-foreground truncate leading-tight">
                                {account.name}
                            </h4>
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                {account.username}
                            </p>
                        </div>

                        {/* Stats row: followers */}
                        <div className="text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">{account.followerCount}</span>
                            {" "}followers
                        </div>

                        {/* Footer: last sync + context menu */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-auto">
                            <span className="text-[10px] text-muted-foreground/60 truncate">
                                Synced {account.lastSync}
                            </span>
                            <CardActionMenu
                                account={account}
                                onReconnect={onReconnect}
                                onDisconnect={onDisconnect}
                                onOpenLogs={onOpenLogs}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

