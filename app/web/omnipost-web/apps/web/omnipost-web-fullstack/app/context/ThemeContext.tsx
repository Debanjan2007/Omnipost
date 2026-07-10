"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type Theme = "light" | "dark"

interface ThemeContextValue {
    /** Current active theme */
    theme: Theme
    /** Flip between light and dark */
    toggleTheme: () => void
    /** Set a specific theme explicitly */
    setTheme: (theme: Theme) => void
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * ThemeProvider
 *
 * Reads the initial theme from localStorage (key: "theme") or falls back to
 * the OS / browser preference. Persists changes back to localStorage and
 * toggles the "dark" class on <html> — matching what AnimatedThemeToggler
 * does in uncontrolled mode so both can coexist without fighting each other.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("light")

    // On mount, resolve the initial theme (client-only, avoids SSR mismatch)
    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const resolved: Theme = stored ?? (systemPrefersDark ? "dark" : "light")
        applyTheme(resolved)
        setThemeState(resolved)
    }, [])

    // Watch for external changes (e.g. AnimatedThemeToggler in uncontrolled mode)
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains("dark")
            setThemeState(isDark ? "dark" : "light")
        })
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })
        return () => observer.disconnect()
    }, [])

    function applyTheme(t: Theme) {
        document.documentElement.classList.toggle("dark", t === "dark")
        localStorage.setItem("theme", t)
    }

    function setTheme(t: Theme) {
        applyTheme(t)
        setThemeState(t)
    }

    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * useTheme — access the current theme and toggle/set functions anywhere in the tree.
 *
 * Also wires into AnimatedThemeToggler's controlled props:
 * @example
 * const { theme, setTheme } = useTheme()
 * <AnimatedThemeToggler theme={theme} onThemeChange={setTheme} />
 */
export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext)
    if (!ctx) {
        throw new Error("useTheme() must be called inside <ThemeProvider>")
    }
    return ctx
}
