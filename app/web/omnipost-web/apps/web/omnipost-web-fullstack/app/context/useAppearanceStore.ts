import { create } from "zustand"

export interface AppearanceSettings {
    theme: "light" | "dark" | "system"
    accentColor: "indigo" | "purple" | "blue" | "green" | "pink" | "orange"
    density: "comfortable" | "compact"
    animations: boolean
}

export const DEFAULT_SETTINGS: AppearanceSettings = {
    theme: "system",
    accentColor: "indigo",
    density: "comfortable",
    animations: true,
}

interface AppearanceState {
    settings: AppearanceSettings
    isInitialized: boolean
    setSettings: (newSettings: Partial<AppearanceSettings>) => void
    initialize: (loadedSettings?: Partial<AppearanceSettings>) => void
}

export const useAppearanceStore = create<AppearanceState>((set) => ({
    settings: DEFAULT_SETTINGS,
    isInitialized: false,
    setSettings: (newSettings) => {
        set((state) => {
            const updated = { ...state.settings, ...newSettings }
            
            // Persist to local storage
            if (typeof window !== "undefined") {
                localStorage.setItem("appearance-settings", JSON.stringify(updated))
                applyAttributesToDOM(updated)
            }
            
            return { settings: updated }
        })
    },
    initialize: (loadedSettings) => {
        const merged = { ...DEFAULT_SETTINGS, ...loadedSettings }
        
        if (typeof window !== "undefined") {
            localStorage.setItem("appearance-settings", JSON.stringify(merged))
            applyAttributesToDOM(merged)
        }
        
        set({ settings: merged, isInitialized: true })
    }
}))

// Helper to set root DOM attributes in real-time
export function applyAttributesToDOM(settings: AppearanceSettings) {
    if (typeof window === "undefined") return
    const root = document.documentElement
    
    if (settings.accentColor) {
        root.setAttribute("data-accent", settings.accentColor)
    }
    if (settings.density) {
        root.setAttribute("data-density", settings.density)
    }
    if (settings.animations !== undefined) {
        root.setAttribute("data-animations", settings.animations ? "enabled" : "disabled")
    }
}

// ─── Reusable Hooks ──────────────────────────────────────────────────────────

export function useAppearance() {
    const settings = useAppearanceStore((state) => state.settings)
    const isInitialized = useAppearanceStore((state) => state.isInitialized)
    const setSettings = useAppearanceStore((state) => state.setSettings)
    return {
        ...settings,
        settings,
        isInitialized,
        setSettings,
    }
}

export function useAccent() {
    const accent = useAppearanceStore((state) => state.settings.accentColor)
    const setSettings = useAppearanceStore((state) => state.setSettings)
    const setAccent = (accentColor: AppearanceSettings["accentColor"]) => setSettings({ accentColor })
    return { accent, setAccent }
}

export function useDensity() {
    const density = useAppearanceStore((state) => state.settings.density)
    const setSettings = useAppearanceStore((state) => state.setSettings)
    const setDensity = (densityVal: AppearanceSettings["density"]) => setSettings({ density: densityVal })
    return { density, setDensity }
}

export function useAnimations() {
    const animations = useAppearanceStore((state) => state.settings.animations)
    const setSettings = useAppearanceStore((state) => state.setSettings)
    const setAnimations = (animationsVal: boolean) => setSettings({ animations: animationsVal })
    return { animations, setAnimations }
}
