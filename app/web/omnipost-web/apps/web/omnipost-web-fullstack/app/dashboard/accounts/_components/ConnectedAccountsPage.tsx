"use client"

import { useState, useMemo, useEffect } from "react"
import { Plus, RefreshCcw } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { MOCK_ACCOUNTS, type Account } from "./data/mockData"
import { PROVIDERS_CONFIG, type ProviderConfig } from "./data/providersConfig"
import { OverviewCards } from "./sections/OverviewCards"
import { FiltersSection } from "./sections/FiltersSection"
import { ConnectedAccountsList, type AccountCardItem } from "./sections/ConnectedAccountsList"
import { AccountDrawer } from "./sections/AccountDrawer"
import { MonitoringPanel } from "./sections/MonitoringPanel"
import { EmptyState } from "./sections/EmptyState"
import { ConnectAccountDialog } from "./sections/ConnectAccountDialog"

export function ConnectedAccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS)
    // Drawer is closed by default — null means no account selected
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    // Filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [platformFilter, setPlatformFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortOption, setSortOption] = useState("recent")

    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const error = searchParams.get("error")
        const success = searchParams.get("success")
        if (error) {
            toast.error(decodeURIComponent(error))
            // Clear URL search params without triggering full reload/rerender
            router.replace("/dashboard/accounts")
        }
        if (success) {
            toast.success(decodeURIComponent(success))
            router.replace("/dashboard/accounts")
        }
    }, [searchParams, router])

    // ── Actions ───────────────────────────────────────────────────────────────

    const handleConnectAccount = (platformName: string) => {
        const provider = Object.values(PROVIDERS_CONFIG).find(
            p => p.name.toLowerCase() === platformName.toLowerCase() || p.key.toLowerCase() === platformName.toLowerCase()
        )
        if (provider) {
            if (provider.enabled && provider.oauthPath) {
                router.push(provider.oauthPath)
            } else {
                toast.error("This provider is not available yet.")
            }
        }
        setIsDialogOpen(false)
    }

    const handleReconnect = (accountId: string) => {
        setAccounts(prev => prev.map(acc => {
            if (acc.id !== accountId) return acc
            return {
                ...acc,
                connectedStatus: "connected",
                healthStatus: "excellent",
                lastSync: "Just now",
                tokenExpiry: "60 days remaining",
                webhookStatus: "active",
                syncLogs: [
                    { time: "Just now", event: "Token reauthorization successful", status: "success" },
                    ...acc.syncLogs,
                ],
            }
        }))
        // Keep the drawer open and updated if the reconnected account is selected
        setSelectedAccount(prev => {
            if (!prev || prev.id !== accountId) return prev
            return {
                ...prev,
                connectedStatus: "connected",
                healthStatus: "excellent",
                lastSync: "Just now",
                tokenExpiry: "60 days remaining",
                webhookStatus: "active",
            }
        })
    }

    const handleDisconnect = (accountId: string) => {
        if (confirm("Disconnect this account? You will lose auto-sync capability.")) {
            setAccounts(prev => prev.filter(acc => acc.id !== accountId))
            if (selectedAccount?.id === accountId) setSelectedAccount(null)
        }
    }

    const handleRefreshAll = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
            setAccounts(prev => prev.map(acc => ({ ...acc, lastSync: "Just now" })))
        }, 1000)
    }

    // ── Merging and Filtering ──────────────────────────────────────────────────

    const mergedItems = useMemo(() => {
        const items: AccountCardItem[] = accounts.map(acc => ({ type: "connected" as const, account: acc }))

        // For each provider in PROVIDERS_CONFIG, if there are NO connected accounts for it, add an unconnected item.
        Object.values(PROVIDERS_CONFIG).forEach(provider => {
            const hasConnected = accounts.some(acc => acc.platform.toLowerCase() === provider.key.toLowerCase())
            if (!hasConnected) {
                items.push({ type: "unconnected" as const, provider })
            }
        })

        return items
    }, [accounts])

    const filteredItems = useMemo(() => {
        return mergedItems
            .filter(item => {
                // 1. Search Query
                if (searchQuery) {
                    const q = searchQuery.toLowerCase()
                    if (item.type === "connected") {
                        const nameMatch = item.account.name.toLowerCase().includes(q)
                        const userMatch = item.account.username.toLowerCase().includes(q)
                        if (!nameMatch && !userMatch) return false
                    } else {
                        const nameMatch = item.provider.name.toLowerCase().includes(q)
                        const descMatch = item.provider.desc.toLowerCase().includes(q)
                        if (!nameMatch && !descMatch) return false
                    }
                }

                // 2. Platform Filter
                if (platformFilter !== "all") {
                    const itemPlatform = item.type === "connected" ? item.account.platform : item.provider.name
                    if (itemPlatform.toLowerCase() !== platformFilter.toLowerCase()) return false
                }

                // 3. Status Filter
                if (statusFilter !== "all") {
                    if (item.type === "connected") {
                        if (item.account.connectedStatus !== statusFilter) return false
                    } else {
                        if (statusFilter !== "disconnected") return false // Unconnected is treated as disconnected
                    }
                }

                return true
            })
            .sort((a, b) => {
                if (sortOption === "alphabetical") {
                    const nameA = a.type === "connected" ? a.account.name : a.provider.name
                    const nameB = b.type === "connected" ? b.account.name : b.provider.name
                    return nameA.localeCompare(nameB)
                }
                if (sortOption === "followers") {
                    const fA = a.type === "connected" ? parseInt(a.account.followerCount.replace(/[^0-9]/g, "")) || 0 : 0
                    const fB = b.type === "connected" ? parseInt(b.account.followerCount.replace(/[^0-9]/g, "")) || 0 : 0
                    return fB - fA
                }
                // default: recent (connected first, then unconnected)
                if (a.type !== b.type) {
                    return a.type === "connected" ? -1 : 1
                }
                return 0
            })
    }, [mergedItems, searchQuery, platformFilter, statusFilter, sortOption])

    // ── Computed stats ────────────────────────────────────────────────────────

    const connectedCount  = accounts.filter(a => a.connectedStatus === "connected").length
    const healthyCount    = accounts.filter(a => a.healthStatus === "excellent" || a.healthStatus === "good").length
    const attentionCount  = accounts.filter(a => a.healthStatus === "warning"   || a.healthStatus === "error").length
    const healthScore     = attentionCount > 0 ? "warning" : "excellent"

    return (
        <div className="h-full flex flex-col overflow-hidden">

            {/* ── Page Header ───────────────────────────────────────────────── */}
            <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-5 py-4 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-base font-bold text-foreground tracking-tight">Connected Accounts</h1>
                    <p className="text-[11px] text-muted-foreground hidden sm:block">
                        Manage and monitor your linked social media accounts from one place.
                    </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={handleRefreshAll}
                        disabled={refreshing}
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted text-xs font-semibold transition-all disabled:opacity-50"
                    >
                        <RefreshCcw size={12} className={refreshing ? "animate-spin" : ""} />
                        <span className="hidden sm:inline">Refresh All</span>
                    </button>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/95 transition-all shadow-sm"
                    >
                        <Plus size={13} />
                        Connect Account
                    </button>
                </div>
            </header>

            {/* ── Scrollable Content Body ───────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-5 sm:p-6 space-y-6 max-w-screen-2xl mx-auto">

                    {/* Monitoring panel — collapsible, separated from accounts */}
                    <MonitoringPanel healthScore={healthScore} />

                    {/* Overview stats */}
                    <OverviewCards
                        connectedCount={connectedCount}
                        healthyCount={healthyCount}
                        attentionCount={attentionCount}
                        lastSync="3 min ago"
                    />

                    {/* Filters row */}
                    <FiltersSection
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        platformFilter={platformFilter}
                        setPlatformFilter={setPlatformFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                    />

                    {/* Account grid — always full width */}
                    {filteredItems.length === 0 ? (
                        <EmptyState onConnectClick={() => setIsDialogOpen(true)} />
                    ) : (
                        <ConnectedAccountsList
                            items={filteredItems}
                            onSelectAccount={setSelectedAccount}
                            onOpenLogs={(acc) => { setSelectedAccount(acc) }}
                            onReconnect={handleReconnect}
                            onDisconnect={handleDisconnect}
                            onConnectPlatform={(oauthPath) => {
                                if (oauthPath) {
                                    router.push(oauthPath)
                                } else {
                                    toast.error("This provider is not available yet.")
                                }
                            }}
                        />
                    )}

                    {/* Bottom breathing room */}
                    <div className="h-8" />
                </div>
            </div>

            {/* ── Account Detail Drawer (slide-over, no space reserved) ──────── */}
            <AccountDrawer
                account={selectedAccount}
                onClose={() => setSelectedAccount(null)}
                onReconnect={handleReconnect}
            />

            {/* ── Connect Account Dialog ────────────────────────────────────── */}
            <ConnectAccountDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConnect={handleConnectAccount}
            />

        </div>
    )
}

