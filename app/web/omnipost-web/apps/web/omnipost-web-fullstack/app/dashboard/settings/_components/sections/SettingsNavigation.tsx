"use client"

import { SETTINGS_NAV_ITEMS, type SettingsTab } from "../data/settingsData"
import { cn } from "@/lib/utils"

interface SettingsNavigationProps {
    activeTab: SettingsTab
    setActiveTab: (tab: SettingsTab) => void
}

export function SettingsNavigation({ activeTab, setActiveTab }: SettingsNavigationProps) {
    return (
        <nav className="space-y-1">
            {SETTINGS_NAV_ITEMS.map((item) => {
                const Icon = item.iconName
                const isActive = activeTab === item.id

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all duration-150 group",
                            isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                    >
                        <Icon
                            size={14}
                            className={cn(
                                "shrink-0 transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )}
                        />
                        <span>{item.label}</span>
                        {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary ml-auto shrink-0 animate-pulse" />
                        )}
                    </button>
                )
            })}
        </nav>
    )
}
