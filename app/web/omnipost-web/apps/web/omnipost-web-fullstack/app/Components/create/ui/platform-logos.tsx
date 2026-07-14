import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import type { PlatformId } from "../data/create-data"

// ─────────────────────────────────────────────────────────────────────────────
// Platform brand glyphs — clean white SVG logos on the platform's brand fill.
// Brand colours reference CSS variables from globals.css (no raw hex here).
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_BG: Record<PlatformId, string> = {
    instagram: "linear-gradient(135deg,#F58529 0%,#DD2A7B 55%,#8134AF 100%)",
    facebook:  "var(--color-brand-facebook)",
    linkedin:  "var(--color-brand-linkedin)",
    x:         "var(--color-brand-x)",
    threads:   "var(--color-brand-threads)",
    bluesky:   "var(--color-brand-bluesky)",
    youtube:   "var(--color-brand-youtube)",
    tiktok:    "var(--color-brand-tiktok)",
    pinterest: "var(--color-brand-pinterest)",
}

// ─── White glyph paths (viewBox 0 0 24 24) ─────────────────────────────────────

const GLYPHS: Record<PlatformId, React.ReactNode> = {
    instagram: (
        <>
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2.2" fill="none" />
            <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2.2" fill="none" />
            <circle cx="17" cy="7" r="1.3" fill="white" />
        </>
    ),
    facebook: (
        <path fill="white" d="M14 22V14h2.7l.5-3.5H14V8.5c0-1 .3-1.5 1.5-1.5H17.5V4a22 22 0 00-2.8-.2C11.7 3.8 10 5.4 10 8.5V10.5H7.5V14H10v8H14z" />
    ),
    linkedin: (
        <>
            <circle cx="5.5" cy="6.5" r="1.8" fill="white" />
            <rect x="4" y="10" width="3" height="11" rx="0.5" fill="white" />
            <path fill="white" d="M20.5 15c0-3-1.5-5-4.5-5a4 4 0 00-3 1.4V10.2H10V21h3v-5.5c0-1.8.8-2.5 2-2.5s2 .8 2 2.5V21h3.5v-6z" />
        </>
    ),
    x: (
        <path fill="white" d="M17.5 3.5h3.1L13.8 11l8 10H15l-5-6.5L4.2 21H1l7.5-8.5L1.5 3.5h6.7L13 9.5l4.5-6zM16.5 19h1.8L7.6 5H5.7L16.5 19z" />
    ),
    threads: (
        <path fill="white" d="M12.4 4C8.2 3.9 5.2 6.6 5.1 10.8c-.15 4.1 2.5 7.25 6.7 7.4 2.1.08 3.8-.55 5.05-1.8L15.55 15.1c-.93.88-2.1 1.32-3.5 1.27-2.9-.1-4.7-2.15-4.6-5.1.1-2.95 2.05-4.9 4.95-4.8 1.5.05 2.65.6 3.4 1.7.48.77.7 1.68.64 2.72-.05 1.1-.54 1.68-1.3 1.65-.43-.02-.8-.32-.8-.82V7.5h-1.28v.82a2.78 2.78 0 00-2.05-.85c-1.7-.06-3.05 1.22-3.12 3.12-.08 1.9 1.15 3.25 2.85 3.32.95.04 1.78-.35 2.35-1.02.42.65 1.1 1.07 2.02 1.1 1.88.07 3.05-1.14 3.12-3.27.07-1.62-.3-2.96-1.1-3.98-1-1.27-2.45-1.96-4.57-2.03zm-1.23 7.95c-.96-.03-1.56-.72-1.52-1.8.04-1.07.7-1.73 1.66-1.7.96.03 1.56.72 1.52 1.8-.04 1.07-.7 1.73-1.66 1.7z" />
    ),
    bluesky: (
        <path fill="white" d="M12 10.8C10.3 8.7 7 5.3 4.6 4.1c-1.9-1-3.6-.4-3.6 2.4 0 .5.28 4.3.47 5 .65 2.4 2.85 3 4.98 2.6-3.1.5-5.72 2-4.5 5 2.2 4.4 8 1.2 10 0 2 1.2 7.8 4.4 10 0 1.22-3-1.4-4.5-4.5-5 2.13.4 4.33-.2 4.98-2.6.2-.7.47-4.5.47-5 0-2.8-1.7-3.4-3.6-2.4C17 5.3 13.7 8.7 12 10.8z" />
    ),
    youtube: (
        <>
            <rect x="2" y="5.5" width="20" height="13" rx="3.5" stroke="white" strokeWidth="1.8" fill="none" />
            <path fill="white" d="M9.8 8.8L16.2 12l-6.4 3.2V8.8z" />
        </>
    ),
    tiktok: (
        <path fill="white" d="M14.2 3c.3 2.2 1.55 3.85 3.8 4.15v2.5c-1.3.08-2.5-.25-3.8-.95v5.65c0 3-2.2 5.3-5.05 5.3-2.85 0-5.05-2.3-5.05-5.2 0-2.7 2-4.9 4.7-5.15v2.6c-1.2.2-2.1 1.1-2.1 2.5 0 1.4 1.1 2.55 2.55 2.55 1.5 0 2.6-1.1 2.6-2.8V3h2.35z" />
    ),
    pinterest: (
        <path fill="white" d="M12 3a9 9 0 00-3.3 17.4c-.08-.72-.15-1.83.03-2.62.16-.72 1.05-4.48 1.05-4.48s-.27-.54-.27-1.33c0-1.25.72-2.18 1.62-2.18.77 0 1.14.57 1.14 1.26 0 .77-.49 1.92-.75 2.98-.2.9.46 1.63 1.34 1.63 1.6 0 2.83-1.69 2.83-4.12 0-2.15-1.55-3.65-3.76-3.65-2.56 0-4.07 1.92-4.07 3.9 0 .77.3 1.6.67 2.05a.27.27 0 01.06.26c-.07.28-.22.9-.25 1.02-.04.17-.13.2-.3.12-1.13-.53-1.84-2.17-1.84-3.5 0-2.85 2.07-5.47 5.97-5.47 3.14 0 5.57 2.24 5.57 5.22 0 3.12-1.96 5.63-4.69 5.63-.91 0-1.77-.48-2.06-1.04l-.56 2.15c-.2.78-.75 1.75-1.12 2.35A9 9 0 1012 3z" />
    ),
}

// ─── Public component ─────────────────────────────────────────────────────────

interface PlatformLogoProps {
    id:        PlatformId
    /** Square size in px. */
    size?:     number
    className?: string
}

/**
 * PlatformLogo — rounded brand square with a white SVG glyph, matching the
 * treatment used across the dashboard (see PlatformIcons.tsx).
 */
export function PlatformLogo({ id, size = 36, className }: PlatformLogoProps) {
    return (
        <div
            role="img"
            aria-label={id}
            className={cn("shrink-0 flex items-center justify-center rounded-xl overflow-hidden", className)}
            style={{ width: size, height: size, background: BRAND_BG[id] }}
        >
            <svg viewBox="0 0 24 24" style={{ width: size * 0.56, height: size * 0.56 }}>
                {GLYPHS[id]}
            </svg>
        </div>
    )
}

// ─── Connected badge ────────────────────────────────────────────────────────

export function ConnectedBadge({ connected }: { connected: boolean }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                connected
                    ? "bg-[color-mix(in_srgb,var(--color-success)_14%,transparent)] text-[var(--color-success)]"
                    : "bg-muted text-muted-foreground",
            )}
        >
            {connected && <Check size={10} strokeWidth={3} />}
            {connected ? "Connected" : "Not linked"}
        </span>
    )
}
