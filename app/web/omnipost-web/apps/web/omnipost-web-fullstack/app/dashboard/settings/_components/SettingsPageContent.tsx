"use client"

import { useState } from "react"
import { SettingsTab } from "./data/settingsData"
import { SettingsNavigation } from "./sections/SettingsNavigation"
import { ProfilePanel } from "./panels/ProfilePanel"
import { WorkspacePanel } from "./panels/WorkspacePanel"
import { PublishingPanel } from "./panels/PublishingPanel"
import { ConnectedAccountsPanel } from "./panels/ConnectedAccountsPanel"
import { AIPanel } from "./panels/AIPanel"
import { NotificationsPanel } from "./panels/NotificationsPanel"
import { AppearancePanel } from "./panels/AppearancePanel"
import { SecurityPanel } from "./panels/SecurityPanel"
import { APIKeysPanel } from "./panels/APIKeysPanel"
import { IntegrationsPanel } from "./panels/IntegrationsPanel"
import { BillingPanel } from "./panels/BillingPanel"
import { AdvancedPanel } from "./panels/AdvancedPanel"
import { Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function SettingsPageContent() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const triggerChange = () => {
        setHasUnsavedChanges(true)
    }

    const handleSaveAll = () => {
        setHasUnsavedChanges(false)
        alert("All settings configurations saved successfully.")
    }

    const renderActivePanel = () => {
        switch (activeTab) {
            case "profile":       return <ProfilePanel       onChange={triggerChange} />
            case "workspace":     return <WorkspacePanel     onChange={triggerChange} />
            case "publishing":    return <PublishingPanel    onChange={triggerChange} />
            case "accounts":      return <ConnectedAccountsPanel />
            case "ai":            return <AIPanel            onChange={triggerChange} />
            case "notifications": return <NotificationsPanel onChange={triggerChange} />
            case "appearance":    return <AppearancePanel    onChange={triggerChange} />
            case "security":      return <SecurityPanel      onChange={triggerChange} />
            case "api":           return <APIKeysPanel />
            case "integrations":  return <IntegrationsPanel />
            case "billing":       return <BillingPanel />
            case "advanced":      return <AdvancedPanel      onChange={triggerChange} />
            default:              return null
        }
    }

    return (
        <div className="h-full flex flex-col overflow-hidden relative">
            
            {/* Header */}
            <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-5 py-4 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-base font-bold text-foreground tracking-tight">Settings</h1>
                    <p className="text-[11px] text-muted-foreground hidden sm:block">Configure personal preferences, collaborate workspace properties, billing and API integrations.</p>
                </div>
            </header>

            {/* Layout body */}
            <div className="flex-1 flex overflow-hidden min-h-0">
                
                {/* Left Navigation bar - sidebar */}
                <aside className="hidden md:block w-56 lg:w-64 shrink-0 border-r border-border overflow-y-auto p-4.5 bg-muted/10">
                    <SettingsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                </aside>

                {/* Right content panel */}
                <main className="flex-1 overflow-y-auto p-5 sm:p-6 min-w-0">
                    <div className="max-w-2xl mx-auto space-y-6">
                        
                        {/* Mobile Navigation fallback */}
                        <div className="md:hidden bg-card border border-border rounded-xl p-3.5 space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Navigation Section</label>
                            <select
                                value={activeTab}
                                onChange={(e) => setActiveTab(e.target.value as SettingsTab)}
                                className="w-full h-8 px-2.5 rounded-lg bg-muted/3 border border-border/60 text-xs text-foreground focus:outline-none"
                            >
                                <option value="profile">Profile</option>
                                <option value="workspace">Workspace Profile</option>
                                <option value="publishing">Publishing Preferences</option>
                                <option value="accounts">Connected Accounts</option>
                                <option value="ai">AI Preferences</option>
                                <option value="notifications">Notifications & Alerts</option>
                                <option value="appearance">Theme & Interface Design</option>
                                <option value="security">Sign In & Password</option>
                                <option value="api">Personal Access Tokens</option>
                                <option value="integrations">App Integrations</option>
                                <option value="billing">Plan & Subscription</option>
                                <option value="advanced">Advanced Options</option>
                            </select>
                        </div>

                        {/* Active Panel rendering */}
                        <div className="animate-in fade-in duration-200">
                            {renderActivePanel()}
                        </div>
                        
                    </div>
                </main>

            </div>

            {/* Unsaved Changes Indicator float bar */}
            {hasUnsavedChanges && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background dark:bg-card dark:text-foreground border border-border shadow-2xl rounded-2xl px-4.5 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2">
                        <Info size={14} className="text-primary" />
                        <span className="text-xs font-semibold">You have unsaved changes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setHasUnsavedChanges(false)}
                            className="text-[10px] font-bold hover:underline px-2 py-1 rounded"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleSaveAll}
                            className="h-7 px-3 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg hover:bg-primary/90 flex items-center gap-1 shadow-sm transition-all"
                        >
                            <Check size={10} /> Save Changes
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}
