/**
 * app/context/index.ts
 *
 * Barrel export for all contexts — use this for clean imports anywhere:
 *
 * @example
 * import { useTheme, useProfile } from "@/app/context"
 */

export { ThemeProvider, useTheme } from "./ThemeContext"
export type { Theme } from "./ThemeContext"

export { ProfileProvider, useProfile } from "./ProfileContext"

export { Providers } from "./Providers"
