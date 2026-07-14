import { TrendingUp, TrendingDown, CalendarDays, CheckCircle2, Plug, Globe } from "lucide-react"
import type { ReactNode } from "react"
import type { AnalyticsCard } from "../data/analytics"
import { ANALYTICS_CARDS } from "../data/analytics"
import { SectionCard } from "../ui/SectionCard"
import { Sparkline } from "../ui/Sparkline"
import { cn } from "@/lib/utils"

// ─── Icon registry ────────────────────────────────────────────────────────────
// Resolves the string iconKey from data/analytics.ts into a rendered element.

const ICON_MAP: Record<AnalyticsCard["iconKey"], ReactNode> = {
    CalendarDays: <CalendarDays size={15} />,
    CheckCircle2: <CheckCircle2 size={15} />,
    Plug:         <Plug size={15} />,
    Globe:        <Globe size={15} />,
}

// ─── Single card ──────────────────────────────────────────────────────────────

interface AnalyticsCardItemProps {
    card: AnalyticsCard
}

function AnalyticsCardItem({ card }: AnalyticsCardItemProps) {
    return (
        <SectionCard className="p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                            background: `color-mix(in srgb, ${card.color} 12%, transparent)`,
                            color:       card.color,
                        }}
                    >
                        {ICON_MAP[card.iconKey]}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground leading-snug">
                        {card.title}
                    </span>
                </div>
                <Sparkline data={card.spark} color={card.color} />
            </div>

            <div>
                <div className="text-3xl font-bold text-foreground tracking-tight">
                    {card.value}
                </div>
                <div className="flex items-center gap-1 mt-1">
                    {card.up
                        ? <TrendingUp   size={11} style={{ color: "var(--color-success)" }} />
                        : <TrendingDown size={11} className="text-muted-foreground" />
                    }
                    <span className={cn(
                        "text-[11px]",
                        card.up ? "text-[var(--color-success)]" : "text-muted-foreground",
                    )}>
                        {card.trend}
                    </span>
                </div>
            </div>
        </SectionCard>
    )
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

/**
 * AnalyticsSection — 4-column responsive grid of stat cards.
 * Data sourced from data/analytics.ts; icons resolved via ICON_MAP.
 */
export function AnalyticsSection() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {ANALYTICS_CARDS.map(card => (
                <AnalyticsCardItem key={card.title} card={card} />
            ))}
        </section>
    )
}
