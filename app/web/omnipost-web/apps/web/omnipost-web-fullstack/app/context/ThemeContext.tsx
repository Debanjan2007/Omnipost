"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useAppearanceStore } from "./useAppearanceStore"

export type Theme = "light" | "dark"

export function useTheme() {
    const { resolvedTheme, setTheme } = useNextTheme()
    
    // Resolve standard light/dark for older components
    const theme = (resolvedTheme === "dark" ? "dark" : "light") as Theme
    
    function toggleTheme() {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        useAppearanceStore.getState().setSettings({ theme: newTheme })
    }
    
    return {
        theme,
        toggleTheme,
        setTheme: (t: Theme) => {
            setTheme(t)
            useAppearanceStore.getState().setSettings({ theme: t })
        },
    }
}
