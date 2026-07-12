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
    const initializeStore = useAppearanceStore((state) => state.initialize)
    const storeSettings = useAppearanceStore((state) => state.settings)

    // 1. Initial hydration on mount from local storage (extremely fast local cache)
    useEffect(() => {
        try {
            const cached = localStorage.getItem("appearance-settings")
            if (cached) {
                const parsed = JSON.parse(cached) as AppearanceSettings
                initializeStore(parsed)
                
                // Keep next-themes in sync
                if (parsed.theme && parsed.theme !== nextTheme) {
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
            initializeStore(DEFAULT_SETTINGS)
        }
    }, [initializeStore, setNextTheme])

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
                    // Update store & local storage cache
                    initializeStore(dbSettings)
                    
                    // Sync theme to next-themes
                    if (dbSettings.theme && dbSettings.theme !== nextTheme) {
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
    }, [user, isUserLoaded, initializeStore, setNextTheme])

    // 3. Keep root DOM attributes in sync when store settings change (or next-theme resolves)
    useEffect(() => {
        applyAttributesToDOM(storeSettings)
    }, [storeSettings])

    // 4. Sync next-themes changes back to the store (e.g. if updated via another theme toggle)
    useEffect(() => {
        if (nextTheme && nextTheme !== storeSettings.theme) {
            useAppearanceStore.getState().setSettings({ theme: nextTheme as AppearanceSettings["theme"] })
        }
    }, [nextTheme, storeSettings.theme])

    // 5. Cross-tab synchronization via browser 'storage' event
    useEffect(() => {
        function handleStorageSync(e: StorageEvent) {
            if (e.key === "appearance-settings" && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue) as AppearanceSettings
                    initializeStore(parsed)
                    if (parsed.theme && parsed.theme !== nextTheme) {
                        setNextTheme(parsed.theme)
                    }
                } catch (err) {
                    console.error("Failed to parse storage sync event:", err)
                }
            }
        }

        window.addEventListener("storage", handleStorageSync)
        return () => window.removeEventListener("storage", handleStorageSync)
    }, [initializeStore, nextTheme, setNextTheme])

    return <>{children}</>
}
