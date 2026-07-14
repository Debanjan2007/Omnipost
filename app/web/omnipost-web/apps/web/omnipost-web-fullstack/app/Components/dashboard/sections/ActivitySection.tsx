import { ChevronRight } from "lucide-react"
import { ACTIVITY_ITEMS, type ActivityItem } from "../data/activity"
import { SectionCard } from "../ui/SectionCard"
import { PlatformIcon } from "../PlatformIcons"
import { cn } from "@/lib/utils"

// ─── Dot styles per activity type ─────────────────────────────────────────────

const DOT_STYLE: Record<ActivityItem["type"], string> = {
    success:   "bg-[var(--color-success)]",
    scheduled: "bg-primary",
    draft:     "bg-muted-foreground",
}

// ─── Single timeline row ──────────────────────────────────────────────────────

function ActivityRow({ item }: { item: ActivityItem }) {
    return (
        <div className="relative flex gap-4 pb-5 last:pb-0">
            {/* Status dot */}
            <div className={cn("relative z-10 mt-1 w-3 h-3 rounded-full shrink-0", DOT_STYLE[item.type])} />

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                        <PlatformIcon name={item.platform} size={20} className="rounded-md" />
                        <p className="text-xs font-medium text-foreground">{item.text}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">{item.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 ml-7 truncate">{item.sub}</p>
            </div>
        </div>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

/**
 * ActivitySection — vertical timeline of recent publishing actions.
 * A dashed connector line runs behind the status dots.
 */
export function ActivitySection() {
    return (
        <SectionCard className="p-5">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5">
                    See all <ChevronRight size={11} />
                </button>
            </div>

            <div className="relative flex flex-col gap-0">
                {/* Vertical connector */}
                <div className="absolute left-[6px] top-3 bottom-3 w-px bg-border" aria-hidden />

                {ACTIVITY_ITEMS.map((item, i) => (
                    <ActivityRow key={i} item={item} />
                ))}
            </div>
        </SectionCard>
    )
}
