"use client"

import { useState, useMemo } from "react"
import { Plus, RefreshCcw, Settings, HelpCircle, WifiOff } from "lucide-react"

import { MOCK_ACCOUNTS, type Account } from "./data/mockData"
import { OverviewCards } from "./sections/OverviewCards"
import { FiltersSection } from "./sections/FiltersSection"
import { ConnectedAccountsList } from "./sections/ConnectedAccountsList"
import { AccountDetailsPanel } from "./sections/AccountDetailsPanel"
import { SyncStatusCard } from "./sections/SyncStatusCard"
import { AccountHealthCard } from "./sections/AccountHealthCard"
import { EmptyState } from "./sections/EmptyState"
import { ConnectAccountDialog } from "./sections/ConnectAccountDialog"

export function ConnectedAccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS)
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(MOCK_ACCOUNTS[0])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    // Filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [platformFilter, setPlatformFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortOption, setSortOption] = useState("recent")

    // Actions
    const handleConnectAccount = (platformName: string) => {
        const newAcc: Account = {
            id: `acc-${Date.now()}`,
            platform: platformName as any,
            name: `OmniPost ${platformName} Channel`,
            username: `@omnipost_${platformName.toLowerCase()}`,
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=" + platformName,
            verified: false,
            followerCount: "1.2K",
            connectedStatus: "connected",
            healthStatus: "excellent",
            lastSync: "Just now",
            apiVersion: "v1.0 (OAuth2)",
            permissionsSummary: "Full read-write scopes authorized",
            businessType: "Creator",
            connectedSince: "Today",
            tokenExpiry: "60 days remaining",
            webhookStatus: "active",
            syncLogs: [{ time: "Just now", event: "Initial authorization check", status: "success" }],
            grantedPermissions: [
                { name: "Publish Posts", granted: true, required: true },
                { name: "Upload Images", granted: true, required: true },
                { name: "Upload Videos", granted: true, required: true },
                { name: "Read Analytics", granted: true, required: true },
                { name: "Read Profile Info", granted: true, required: true }
            ]
        }
        setAccounts(prev => [newAcc, ...prev])
        setSelectedAccount(newAcc)
        setIsDialogOpen(false)
    }

    const handleReconnect = (accountId: string) => {
        setAccounts(prev => prev.map(acc => {
            if (acc.id === accountId) {
                return {
                    ...acc,
                    connectedStatus: "connected",
                    healthStatus: "excellent",
                    lastSync: "Just now",
                    tokenExpiry: "60 days remaining",
                    webhookStatus: "active",
                    syncLogs: [{ time: "Just now", event: "Token reauthorization successful", status: "success" }, ...acc.syncLogs]
                }
            }
            return acc
        }))
        // Refresh detail panel state if opened
        setTimeout(() => {
            setSelectedAccount(prev => {
                if (prev?.id === accountId) {
                    const match = accounts.find(a => a.id === accountId)
                    return match ? {
                        ...match,
                        connectedStatus: "connected",
                        healthStatus: "excellent",
                        lastSync: "Just now",
                        tokenExpiry: "60 days remaining",
                        webhookStatus: "active"
                    } : null
                }
                return prev
            })
        }, 100)
    }

    const handleDisconnect = (accountId: string) => {
        if (confirm("Are you sure you want to disconnect this account? You will lose auto-sync capability.")) {
            setAccounts(prev => prev.filter(acc => acc.id !== accountId))
            if (selectedAccount?.id === accountId) {
                setSelectedAccount(null)
            }
        }
    }

    const handleRefreshAll = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
            setAccounts(prev => prev.map(acc => ({
                ...acc,
                lastSync: "Just now"
            })))
        }, 1000)
    }

    // Filter and Sort Computation
    const filteredAccounts = useMemo(() => {
        return accounts
            .filter(acc => {
                const queryMatch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   acc.username.toLowerCase().includes(searchQuery.toLowerCase())
                const platformMatch = platformFilter === "all" || acc.platform === platformFilter
                const statusMatch = statusFilter === "all" || acc.connectedStatus === statusFilter
                return queryMatch && platformMatch && statusMatch
            })
            .sort((a, b) => {
                if (sortOption === "alphabetical") return a.name.localeCompare(b.name)
                if (sortOption === "followers") {
                    const numA = parseInt(a.followerCount.replace(/,/g, "")) || 0
                    const numB = parseInt(b.followerCount.replace(/,/g, "")) || 0
                    return numB - numA
                }
                return 0
            })
    }, [accounts, searchQuery, platformFilter, statusFilter, sortOption])

    // Overview Stats
    const connectedCount = accounts.filter(a => a.connectedStatus === "connected").length
    const healthyCount = accounts.filter(a => a.healthStatus === "excellent" || a.healthStatus === "good").length
    const attentionCount = accounts.filter(a => a.healthStatus === "warning" || a.healthStatus === "error").length

    return (
        <div className="h-full flex flex-col overflow-hidden">
            
            {/* Header bar */}
            <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-5 py-4 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-base font-bold text-foreground tracking-tight">Connected Accounts</h1>
                    <p className="text-[11px] text-muted-foreground hidden sm:block">Manage and monitor your linked social media accounts from one place.</p>
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
                        Connect New Account
                    </button>
                </div>
            </header>

            {/* Content area */}
            <div className="flex-1 flex overflow-hidden min-h-0">
                
                {/* Left Area (metrics, filters, card listing) */}
                <div className="flex-1 overflow-y-auto min-w-0">
                    <div className="p-5 sm:p-6 space-y-6 max-w-5xl mx-auto lg:max-w-none">
                        
                        <OverviewCards
                            connectedCount={connectedCount}
                            healthyCount={healthyCount}
                            attentionCount={attentionCount}
                            lastSync="3 min ago"
                        />

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

                        {filteredAccounts.length === 0 ? (
                            <EmptyState onConnectClick={() => setIsDialogOpen(true)} />
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                                
                                {/* 3 Column grid for accounts listing */}
                                <div className="lg:col-span-2 xl:col-span-3">
                                    <ConnectedAccountsList
                                        accounts={filteredAccounts}
                                        onSelectAccount={(acc) => setSelectedAccount(acc)}
                                        onReconnect={handleReconnect}
                                        onDisconnect={handleDisconnect}
                                        selectedAccountId={selectedAccount?.id}
                                    />
                                </div>

                                {/* Sidebar Column: Sync status + System Health collapsible */}
                                <div className="space-y-6">
                                    <SyncStatusCard />
                                    <AccountHealthCard healthScore={attentionCount > 0 ? "warning" : "excellent"} />
                                </div>

                            </div>
                        )}

                        <div className="h-10" />
                    </div>
                </div>

                {/* Right Area - Detail Diagnostics Draw panel */}
                {selectedAccount && (
                    <AccountDetailsPanel
                        account={selectedAccount}
                        onClose={() => setSelectedAccount(null)}
                        onReconnect={handleReconnect}
                    />
                )}

            </div>

            {/* OAuth platform selector Dialog */}
            <ConnectAccountDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConnect={handleConnectAccount}
            />

        </div>
    )
}
