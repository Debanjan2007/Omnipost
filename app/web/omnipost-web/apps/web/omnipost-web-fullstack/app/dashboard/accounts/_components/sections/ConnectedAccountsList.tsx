"use client"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal, ShieldAlert, ShieldCheck, RefreshCcw, WifiOff, Trash2, Database, Eye } from "lucide-react"
import type { Account } from "../data/mockData"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"

interface ConnectedAccountsListProps {
    accounts: Account[]
    onSelectAccount: (account: Account) => void
    onReconnect: (accountId: string) => void
    onDisconnect: (accountId: string) => void
    selectedAccountId?: string
}

// ─── Simple Dropdown Action Menu ──────────────────────────────────────────────

function CardActionMenu({
    account,
    onReconnect,
    onDisconnect,
    onSelectAccount,
}: {
    account: Account
    onReconnect: (id: string) => void
    onDisconnect: (id: string) => void
    onSelectAccount: (acc: Account) => void
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
            >
                <MoreHorizontal size={14} />
            </button>

            {open && (
                <div className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-border/80 bg-popover text-popover-foreground shadow-xl p-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                        type="button"
                        onClick={() => {
                            onSelectAccount(account)
                            setOpen(false)
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground text-left transition-colors font-medium text-foreground"
                    >
                        <Eye size={12} className="text-muted-foreground" />
                        View Details
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onReconnect(account.id)
                            setOpen(false)
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground text-left transition-colors font-medium text-foreground"
                    >
                        <RefreshCcw size={12} className="text-muted-foreground" />
                        Reconnect
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            onSelectAccount(account) // Opens details drawer where logs reside
                            setOpen(false)
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground text-left transition-colors font-medium text-foreground"
                    >
                        <Database size={12} className="text-muted-foreground" />
                        View Logs
                    </button>
                    <div className="h-px bg-border/40 my-1" />
                    <button
                        type="button"
                        onClick={() => {
                            onDisconnect(account.id)
                            setOpen(false)
                        }}
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

// ─── ConnectedAccountsList ───────────────────────────────────────────────────

export function ConnectedAccountsList({
    accounts,
    onSelectAccount,
    onReconnect,
    onDisconnect,
    selectedAccountId
}: ConnectedAccountsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {accounts.map((account) => {
                const isActive = selectedAccountId === account.id
                const isWarning = account.healthStatus === "warning"
                const isError = account.healthStatus === "error"
                const isDisconnected = account.connectedStatus === "disconnected"

                // Compute custom status pill config
                const getStatusPill = () => {
                    if (isDisconnected) {
                        return { label: "Disconnected", style: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" }
                    }
                    if (isError) {
                        return { label: "Failed", style: "bg-red-500/10 text-red-500 border-red-500/20" }
                    }
                    if (isWarning) {
                        return { label: "Needs Reauth", style: "bg-amber-500/10 text-amber-500 border-amber-500/20" }
                    }
                    return { label: "Connected", style: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" }
                }

                const statusPill = getStatusPill()

                return (
                    <div
                        key={account.id}
                        onClick={() => onSelectAccount(account)}
                        className={cn(
                            "group bg-card border rounded-2xl p-5 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-48 relative",
                            isActive
                                ? "border-primary shadow-sm ring-1 ring-primary/20"
                                : "border-border/60 hover:border-border"
                        )}
                    >
                        {/* Header Details */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-3">
                                {/* Profile Avatar & Brand Icon overlay */}
                                <div className="relative shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={account.avatarUrl}
                                        alt={account.name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-border/40 bg-muted"
                                    />
                                    <div className="absolute -bottom-1 -right-1">
                                        <PlatformIcon name={account.platform} size={20} className="shadow-md rounded-md" />
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <h4 className="text-sm font-bold text-foreground truncate">{account.name}</h4>
                                    <p className="text-xs text-muted-foreground truncate">{account.username}</p>
                                </div>
                            </div>

                            {/* Status badge - aligned top-right */}
                            <span className={cn("text-[9px] font-bold px-2.5 py-0.5 rounded-full border shrink-0", statusPill.style)}>
                                {statusPill.label}
                            </span>
                        </div>

                        {/* Middle body info */}
                        <div className="my-2.5 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{account.followerCount} followers</span>
                        </div>

                        {/* Footer section (Last Sync + Actions) */}
                        <div className="border-t border-border/40 pt-3.5 mt-auto flex items-center justify-between gap-2">
                            <span className="text-[10px] text-muted-foreground/60">
                                Sync: {account.lastSync}
                            </span>

                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                <button
                                    type="button"
                                    onClick={() => onSelectAccount(account)}
                                    className="h-7 px-3.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs font-semibold transition-all"
                                >
                                    View Details
                                </button>
                                <CardActionMenu
                                    account={account}
                                    onReconnect={onReconnect}
                                    onDisconnect={onDisconnect}
                                    onSelectAccount={onSelectAccount}
                                />
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
