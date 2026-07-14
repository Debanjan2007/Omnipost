/**
 * app/context/index.ts
 *
 * Barrel export for all contexts — use this for clean imports anywhere:
 *
 * @example
 * import { useAppearance, useProfile } from "@/app/context"
 */

export { ThemeProvider } from "next-themes"
export { useTheme } from "./ThemeContext"
export type { Theme } from "./ThemeContext"

export { ProfileProvider, useProfile } from "./ProfileContext"

export {
    useAppearanceStore,
    useAppearance,
    useAccent,
    useDensity,
    useAnimations,
    DEFAULT_SETTINGS,
    applyAttributesToDOM,
} from "./useAppearanceStore"
export type { AppearanceSettings } from "./useAppearanceStore"

export { AppearanceProvider } from "./AppearanceProvider"

export { Providers } from "./Providers"
