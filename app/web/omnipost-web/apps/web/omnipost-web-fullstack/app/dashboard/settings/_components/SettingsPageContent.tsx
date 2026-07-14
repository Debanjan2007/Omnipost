"use client"

import { useState, useEffect } from "react"
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
import { useAppearance, useAppearanceStore, DEFAULT_SETTINGS, applyAttributesToDOM } from "@/app/context"
import { useTheme } from "next-themes"

export function SettingsPageContent() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
    
    // Legacy mock state for other settings tabs
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const triggerChange = () => {
        setHasUnsavedChanges(true)
    }

    // --- Global Appearance Sync and Lifted Page-Level Draft State ---
    const { settings, setSettings } = useAppearance()
    const { setTheme: setNextTheme } = useTheme()

    const [draftTheme, setDraftTheme] = useState<"light" | "dark" | "system">("system")
    const [draftAccent, setDraftAccent] = useState<"indigo" | "purple" | "blue" | "green" | "pink" | "orange">("indigo")
    const [draftDensity, setDraftDensity] = useState<"comfortable" | "compact">("comfortable")
    const [draftAnimations, setDraftAnimations] = useState<boolean>(true)

    // Sync draft with global store changes (e.g. background fetch completion)
    useEffect(() => {
        setDraftTheme(settings.theme)
        setDraftAccent(settings.accentColor)
        setDraftDensity(settings.density)
        setDraftAnimations(settings.animations)
    }, [settings])

    const isAppearanceDirty = 
        draftTheme !== settings.theme ||
        draftAccent !== settings.accentColor ||
        draftDensity !== settings.density ||
        draftAnimations !== settings.animations

    const pageIsDirty = activeTab === "appearance" ? isAppearanceDirty : hasUnsavedChanges

    // Live Preview Effect: Apply draft values instantly to root HTML element attributes
    useEffect(() => {
        if (activeTab !== "appearance") return

        applyAttributesToDOM({
            theme: draftTheme,
            accentColor: draftAccent,
            density: draftDensity,
            animations: draftAnimations,
        })
        setNextTheme(draftTheme)
    }, [draftTheme, draftAccent, draftDensity, draftAnimations, activeTab, setNextTheme])

    // Cleanup: Reset root attributes to saved settings when leaving/unmounting the settings page
    useEffect(() => {
        return () => {
            const saved = useAppearanceStore.getState().settings
            applyAttributesToDOM(saved)
            setNextTheme(saved.theme)
        }
    }, [setNextTheme])

    // Warnings: Warn before page reload
    useEffect(() => {
        if (!pageIsDirty) return

        function handleBeforeUnload(e: BeforeUnloadEvent) {
            e.preventDefault()
            e.returnValue = ""
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [pageIsDirty])

    // Warnings: Intercept link clicks to warn on client-side routing
    useEffect(() => {
        if (!pageIsDirty) return

        function handleLinkClick(e: MouseEvent) {
            let target = e.target as HTMLElement | null
            while (target && target !== document.body) {
                if (target.tagName === "A") {
                    const href = target.getAttribute("href")
                    if (href && href.startsWith("/") && !href.startsWith("/dashboard/settings")) {
                        const leave = window.confirm("You have unsaved changes. Are you sure you want to leave?")
                        if (!leave) {
                            e.preventDefault()
                            e.stopPropagation()
                        }
                    }
                    break
                }
                target = target.parentElement
            }
        }

        document.addEventListener("click", handleLinkClick, { capture: true })
        return () => document.removeEventListener("click", handleLinkClick, { capture: true })
    }, [pageIsDirty])

    const handleSaveAppearance = async () => {
        try {
            const body = {
                theme: draftTheme,
                accentColor: draftAccent,
                density: draftDensity,
                animations: draftAnimations,
            }
            const res = await fetch("/api/appearance", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            if (!res.ok) throw new Error("Save request failed")
            const savedSettings = await res.json()

            // Update Zustand Store, writing back to local storage cache
            setSettings(savedSettings)
            alert("Appearance settings saved successfully.")
        } catch (err) {
            console.error("Failed to save appearance settings:", err)
            alert("Failed to save changes. Please try again.")
        }
    }

    const handleDiscard = () => {
        if (activeTab === "appearance") {
            setDraftTheme(settings.theme)
            setDraftAccent(settings.accentColor)
            setDraftDensity(settings.density)
            setDraftAnimations(settings.animations)
            
            // Re-apply original store values
            applyAttributesToDOM(settings)
            setNextTheme(settings.theme)
        } else {
            setHasUnsavedChanges(false)
        }
    }

    const handleSaveAll = async () => {
        if (activeTab === "appearance") {
            await handleSaveAppearance()
        } else {
            setHasUnsavedChanges(false)
            alert("All settings configurations saved successfully.")
        }
    }

    const handleResetToDefaults = async () => {
        try {
            const res = await fetch("/api/appearance", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(DEFAULT_SETTINGS),
            })
            if (!res.ok) throw new Error("Reset request failed")
            const resetSettings = await res.json()

            // Update store
            setSettings(resetSettings)

            // Reset local page drafts
            setDraftTheme(resetSettings.theme)
            setDraftAccent(resetSettings.accentColor)
            setDraftDensity(resetSettings.density)
            setDraftAnimations(resetSettings.animations)
            
            alert("Appearance settings reset to default values.")
        } catch (err) {
            console.error("Failed to reset appearance settings:", err)
            alert("Failed to reset settings. Please try again.")
        }
    }

    const renderActivePanel = () => {
        switch (activeTab) {
            case "profile":       return <ProfilePanel       onChange={triggerChange} />
            case "workspace":     return <WorkspacePanel     onChange={triggerChange} />
            case "publishing":    return <PublishingPanel    onChange={triggerChange} />
            case "accounts":      return <ConnectedAccountsPanel />
            case "ai":            return <AIPanel            onChange={triggerChange} />
            case "notifications": return <NotificationsPanel onChange={triggerChange} />
            case "appearance":    return (
                <AppearancePanel
                    draftTheme={draftTheme}
                    setDraftTheme={setDraftTheme}
                    draftAccent={draftAccent}
                    setDraftAccent={setDraftAccent}
                    draftDensity={draftDensity}
                    setDraftDensity={setDraftDensity}
                    draftAnimations={draftAnimations}
                    setDraftAnimations={setDraftAnimations}
                    onResetToDefaults={handleResetToDefaults}
                />
            )
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
            {pageIsDirty && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background dark:bg-card dark:text-foreground border border-border shadow-2xl rounded-2xl px-4.5 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2">
                        <Info size={14} className="text-primary" />
                        <span className="text-xs font-semibold">You have unsaved changes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDiscard}
                            className="text-[10px] font-bold hover:underline px-2 py-1 rounded cursor-pointer"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handleSaveAll}
                            className="h-7 px-3 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg hover:bg-primary/90 flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                        >
                            <Check size={10} /> Save Changes
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}
