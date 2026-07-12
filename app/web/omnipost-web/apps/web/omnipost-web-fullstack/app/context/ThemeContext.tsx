"use client"

import { useTheme as useNextTheme } from "next-themes"

export type Theme = "light" | "dark"

export function useTheme() {
    const { resolvedTheme, setTheme } = useNextTheme()
    
    // Resolve standard light/dark for older components
    const theme = (resolvedTheme === "dark" ? "dark" : "light") as Theme
    
    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    
    return {
        theme,
        toggleTheme,
        setTheme: (t: Theme) => setTheme(t),
    }
}
