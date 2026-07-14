"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { useAppearanceStore, DEFAULT_SETTINGS, applyAttributesToDOM, type AppearanceSettings } from "./useAppearanceStore"

interface AppearanceProviderProps {
    children: React.ReactNode
}

export function AppearanceProvider({ children }: AppearanceProviderProps) {
    const { user, isLoaded: isUserLoaded } = useUser()
    const { theme: nextTheme, setTheme: setNextTheme } = useTheme()
    const storeSettings = useAppearanceStore((state) => state.settings)

    // 1. Initial hydration on mount from local storage (extremely fast local cache)
    // Runs exactly once on mount to prevent infinite loop hydration depth errors.
    useEffect(() => {
        try {
            const cached = localStorage.getItem("appearance-settings")
            const initializeStore = useAppearanceStore.getState().initialize
            
            if (cached) {
                const parsed = JSON.parse(cached) as AppearanceSettings
                initializeStore(parsed)
                
                // Keep next-themes in sync
                if (parsed.theme) {
                    setNextTheme(parsed.theme)
                }
            } else {
                initializeStore(DEFAULT_SETTINGS)
                if (nextTheme) {
                    initializeStore({ theme: nextTheme as AppearanceSettings["theme"] })
                }
            }
        } catch (e) {
            console.error("Failed to restore appearance settings cache:", e)
            useAppearanceStore.getState().initialize(DEFAULT_SETTINGS)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // 2. Fetch fresh settings from the database in the background when signed in
    useEffect(() => {
        if (!isUserLoaded || !user) return

        let active = true

        async function fetchDbSettings() {
            try {
                const res = await fetch("/api/appearance")
                if (!res.ok) throw new Error("Failed to fetch settings")
                const dbSettings = await res.json()
                
                if (active && dbSettings && Object.keys(dbSettings).length > 0) {
                    const initializeStore = useAppearanceStore.getState().initialize
                    
                    // Update store & local storage cache
                    initializeStore(dbSettings)
                    
                    // Sync theme to next-themes
                    if (dbSettings.theme) {
                        setNextTheme(dbSettings.theme)
                    }
                }
            } catch (err) {
                console.error("Background sync for appearance settings failed:", err)
            }
        }

        fetchDbSettings()

        return () => {
            active = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isUserLoaded])

    // 3. Keep root DOM attributes in sync when store settings change
    useEffect(() => {
        applyAttributesToDOM(storeSettings)
    }, [storeSettings])

    // 4. Cross-tab synchronization via browser 'storage' event
    useEffect(() => {
        function handleStorageSync(e: StorageEvent) {
            if (e.key === "appearance-settings" && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue) as AppearanceSettings
                    const initializeStore = useAppearanceStore.getState().initialize
                    
                    initializeStore(parsed)
                    if (parsed.theme) {
                        setNextTheme(parsed.theme)
                    }
                } catch (err) {
                    console.error("Failed to parse storage sync event:", err)
                }
            }
        }

        window.addEventListener("storage", handleStorageSync)
        return () => window.removeEventListener("storage", handleStorageSync)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>{children}</>
}
