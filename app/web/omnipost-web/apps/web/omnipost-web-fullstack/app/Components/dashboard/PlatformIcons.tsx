// ─── All platform SVG icons including TikTok and Pinterest ───────────────────
// Overwrite of the dashboard version to add new platforms.

import { cn } from "@/lib/utils"

const PLATFORM_BG: Record<string, string> = {
    Instagram:   "linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)",
    Facebook:    "var(--color-brand-facebook)",
    LinkedIn:    "var(--color-brand-linkedin)",
    "Twitter/X": "var(--color-brand-x)",
    Threads:     "var(--color-brand-threads)",
    Bluesky:     "var(--color-brand-bluesky)",
    YouTube:     "var(--color-brand-youtube)",
    TikTok:      "var(--color-brand-tiktok)",
    Pinterest:   "var(--color-brand-pinterest)",
}

// ─── SVG components ───────────────────────────────────────────────────────────

function IgSvg()  { return (<svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2.2"/><circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2.2"/><circle cx="17" cy="7" r="1.3" fill="white"/></svg>) }
function FbSvg()  { return (<svg viewBox="0 0 24 24" fill="white" className="w-full h-full"><path d="M14 22V14h2.7l.5-3.5H14V8.5c0-1 .3-1.5 1.5-1.5H17.5V4a22 22 0 00-2.8-.2C11.7 3.8 10 5.4 10 8.5V10.5H7.5V14H10v8H14z"/></svg>) }
function LiSvg()  { return (<svg viewBox="0 0 24 24" fill="white" className="w-full h-full"><circle cx="5.5" cy="6.5" r="1.8"/><rect x="4" y="10" width="3" height="11" rx="0.5"/><path d="M20.5 15c0-3-1.5-5-4.5-5a4 4 0 00-3 1.4V10.2H10V21h3v-5.5c0-1.8.8-2.5 2-2.5s2 .8 2 2.5V21h3.5v-6z"/></svg>) }
function XSvg()   { return (<svg viewBox="0 0 24 24" fill="white" className="w-full h-full"><path d="M17.5 3.5h3.1L13.8 11l8 10H15l-5-6.5L4.2 21H1l7.5-8.5L1.5 3.5h6.7L13 9.5l4.5-6zM16.5 19h1.8L7.6 5H5.7L16.5 19z"/></svg>) }
function TdSvg()  { return (<svg viewBox="0 0 24 24" fill="white" className="w-full h-full"><path d="M12.4 4C8.2 3.9 5.2 6.6 5.1 10.8c-.15 4.1 2.5 7.25 6.7 7.4 2.1.08 3.8-.55 5.05-1.8L15.55 15.1c-.93.88-2.1 1.32-3.5 1.27-2.9-.1-4.7-2.15-4.6-5.1.1-2.95 2.05-4.9 4.95-4.8 1.5.05 2.65.6 3.4 1.7.48.77.7 1.68.64 2.72-.05 1.1-.54 1.68-1.3 1.65-.43-.02-.8-.32-.8-.82V7.5h-1.28v.82a2.78 2.78 0 00-2.05-.85c-1.7-.06-3.05 1.22-3.12 3.12-.08 1.9 1.15 3.25 2.85 3.32.95.04 1.78-.35 2.35-1.02.42.65 1.1 1.07 2.02 1.1 1.88.07 3.05-1.14 3.12-3.27.07-1.62-.3-2.96-1.1-3.98-1-1.27-2.45-1.96-4.57-2.03zm-1.23 7.95c-.96-.03-1.56-.72-1.52-1.8.04-1.07.7-1.73 1.66-1.7.96.03 1.56.72 1.52 1.8-.04 1.07-.7 1.73-1.66 1.7z"/></svg>) }
function BsSvg()  { return (<svg viewBox="0 0 24 24" fill="white" className="w-full h-full"><path d="M12 10.8C10.3 8.7 7 5.3 4.6 4.1c-1.9-1-3.6-.4-3.6 2.4 0 .5.28 4.3.47 5 .65 2.4 2.85 3 4.98 2.6-3.1.5-5.72 2-4.5 5 2.2 4.4 8 1.2 10 0 2 1.2 7.8 4.4 10 0 1.22-3-1.4-4.5-4.5-5 2.13.4 4.33-.2 4.98-2.6.2-.7.47-4.5.47-5 0-2.8-1.7-3.4-3.6-2.4C17 5.3 13.7 8.7 12 10.8z"/></svg>) }
function YtSvg()  { return (<svg viewBox="0 0 24 24" fill="none" className="w-full h-full"><rect x="2" y="5.5" width="20" height="13" rx="3.5" stroke="white" strokeWidth="1.8"/><path d="M9.8 8.8L16.2 12l-6.4 3.2V8.8z" fill="white"/></svg>) }
function TkSvg()  { return (<svg viewBox="0 0 24 24" fill="white" className="w-full h-full"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.79 1.52V6.77a4.85 4.85 0 01-1.02-.08z"/></svg>) }
function PnSvg()  { return (<svg viewBox="0 0 24 24" fill="white" className="w-full h-full"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm.5 13.5c-.7 0-1.4-.4-1.6-.9l-.8 3.1c-.3 1-.8 2-1.3 2.6A10.04 10.04 0 012 12 10 10 0 0112 2a10 10 0 010 20c-.5 0-1 0-1.5-.1.4-.7.9-1.6 1.2-2.6l.4-1.7c.4.7 1.3 1.2 2.4 1.2 3.2 0 5.4-2.9 5.4-6.8 0-3-2.5-5.1-5.9-5.1-4.1 0-6.3 2.8-6.3 5.8 0 1.4.7 3.1 1.9 3.6.2.1.3 0 .3-.2l.2-.8c0-.2 0-.3-.1-.4-.4-.5-.6-1.1-.6-1.8 0-2.3 1.7-4.3 4.4-4.3 2.4 0 3.7 1.5 3.7 3.4 0 2.3-1 3.8-2.5 3.8-.8 0-1.4-.7-1.2-1.5.2-.9.7-1.9.7-2.5 0-.6-.3-1.1-.9-1.1-.7 0-1.3.7-1.3 1.7 0 .6.2 1 .2 1l-.8 3.5z"/></svg>) }

const SVG_MAP: Record<string, React.FC> = {
    Instagram: IgSvg, Facebook: FbSvg, LinkedIn: LiSvg, "Twitter/X": XSvg,
    Threads: TdSvg,   Bluesky: BsSvg,  YouTube: YtSvg,  TikTok: TkSvg, Pinterest: PnSvg,
}

// ─── Public component ─────────────────────────────────────────────────────────

interface PlatformIconProps {
    name:       string
    size?:      number
    className?: string
}

/**
 * PlatformIcon — brand-correct icon for any supported platform.
 * Works for all 9 platforms: Instagram, Facebook, LinkedIn, Twitter/X,
 * Threads, Bluesky, YouTube, TikTok, Pinterest.
 * Background from CSS variables only — no raw hex in this file.
 */
export function PlatformIcon({ name, size = 32, className }: PlatformIconProps) {
    const bg      = PLATFORM_BG[name] ?? "var(--muted-foreground)"
    const IconSvg = SVG_MAP[name]

    return (
        <div
            aria-label={name}
            className={cn("shrink-0 flex items-center justify-center rounded-xl overflow-hidden", className)}
            style={{ width: size, height: size, background: bg }}
        >
            <div style={{ width: size * 0.56, height: size * 0.56 }}>
                {IconSvg ? <IconSvg /> : (
                    <span
                        className="text-white font-bold flex items-center justify-center w-full h-full"
                        style={{ fontSize: size * 0.4 }}
                    >
                        {name[0]}
                    </span>
                )}
            </div>
        </div>
    )
}
