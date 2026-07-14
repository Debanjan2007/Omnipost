import Link from "next/link"
import { ChevronRight, RefreshCw } from "lucide-react"
import { CONNECTED_PLATFORMS, type Platform } from "../data/platforms"
import { SectionCard } from "../ui/SectionCard"
import { PlatformIcon } from "../PlatformIcons"
import { cn } from "@/lib/utils"

// ─── Single platform card ─────────────────────────────────────────────────────

function PlatformCard({ platform }: { platform: Platform }) {
    return (
        <SectionCard className={cn(
            "p-4 flex flex-col gap-3 transition-all duration-200",
            platform.connected
                ? "hover:shadow-sm"
                : "border-dashed opacity-70 hover:opacity-90",
        )}>
            {/* Header: icon + status badge */}
            <div className="flex items-start justify-between">
                <PlatformIcon name={platform.name} size={36} />
                <span className={cn(
                    "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                    platform.connected
                        ? "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]"
                        : "bg-muted text-muted-foreground",
                )}>
                    {platform.connected ? "Live" : "Off"}
                </span>
            </div>

            {/* Name + followers */}
            <div>
                <p className="text-xs font-semibold text-foreground">{platform.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                    {platform.connected ? `${platform.followers} followers` : "Not connected"}
                </p>
            </div>

            {/* Last sync */}
            <div className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                <RefreshCw size={9} /> {platform.sync}
            </div>

            {/* CTA */}
            <button className={cn(
                "w-full h-7 rounded-lg text-[11px] font-medium transition-all",
                platform.connected
                    ? "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}>
                {platform.connected ? "Manage" : "Connect"}
            </button>
        </SectionCard>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

/**
 * PlatformsSection — responsive grid of connected/disconnected platform cards.
 * Up to 7 columns on XL screens (one per platform).
 */
export function PlatformsSection() {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-foreground">Connected Platforms</h2>
                <Link
                    href="/dashboard/accounts"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
                >
                    Manage all <ChevronRight size={11} />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3">
                {CONNECTED_PLATFORMS.map(p => (
                    <PlatformCard key={p.name} platform={p} />
                ))}
            </div>
        </section>
    )
}
