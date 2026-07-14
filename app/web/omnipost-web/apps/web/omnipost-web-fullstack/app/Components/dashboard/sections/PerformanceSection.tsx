"use client"

// Tab state requires client context.
import { useState } from "react"
import { TrendingUp, Clock } from "lucide-react"
import { CHART_TABS, X_AXIS_LABELS, type ChartTabKey } from "../data/chart"
import { UPCOMING_POSTS } from "../data/content"
import { SectionCard, SectionTitle, ViewAll } from "../ui/SectionCard"
import { LineChart } from "../ui/LineChart"
import { StatusBadge } from "../ui/StatusBadge"
import { PlatformIcon } from "../PlatformIcons"
import { cn } from "@/lib/utils"

// ─── Tab switcher ─────────────────────────────────────────────────────────────

interface TabBarProps {
    active:   ChartTabKey
    onChange: (key: ChartTabKey) => void
}

function TabBar({ active, onChange }: TabBarProps) {
    return (
        <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
            {CHART_TABS.map(t => (
                <button
                    key={t.key}
                    onClick={() => onChange(t.key)}
                    className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
                        active === t.key
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {t.label}
                </button>
            ))}
        </div>
    )
}

// ─── Performance chart card ───────────────────────────────────────────────────

function PerformanceCard() {
    const [activeKey, setActiveKey] = useState<ChartTabKey>("reach")
    const tab = CHART_TABS.find(t => t.key === activeKey)!

    return (
        <SectionCard className="lg:col-span-2 p-5 flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <SectionTitle>Recent Performance</SectionTitle>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Last 30 days</p>
                </div>
                <TabBar active={activeKey} onChange={setActiveKey} />
            </div>

            {/* Current stat */}
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{tab.stat}</span>
                <span className="text-xs font-medium flex items-center gap-0.5" style={{ color: "var(--color-success)" }}>
                    <TrendingUp size={11} /> {tab.change}
                </span>
            </div>

            <LineChart data={tab.data} color={tab.color} />

            {/* X-axis labels */}
            <div className="flex justify-between text-[10px] text-muted-foreground/50 -mt-1">
                {X_AXIS_LABELS.map(l => <span key={l}>{l}</span>)}
            </div>
        </SectionCard>
    )
}

// ─── Upcoming posts card ──────────────────────────────────────────────────────

function UpcomingPostsCard() {
    return (
        <SectionCard className="p-5 flex flex-col gap-4">
            <SectionTitle action={<ViewAll href="/dashboard/history" />}>
                Upcoming Posts
            </SectionTitle>

            <div className="flex flex-col gap-1.5">
                {UPCOMING_POSTS.map((post, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors cursor-default"
                    >
                        <PlatformIcon name={post.platform} size={28} />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{post.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                                <Clock size={9} /> {post.date}
                            </p>
                        </div>
                        <StatusBadge status={post.status} />
                    </div>
                ))}
            </div>
        </SectionCard>
    )
}

// ─── Composed section ─────────────────────────────────────────────────────────

/**
 * PerformanceSection — 2/3 chart + 1/3 upcoming posts in a 3-column grid.
 * Tab state is co-located inside PerformanceCard for single responsibility.
 */
export function PerformanceSection() {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <PerformanceCard />
            <UpcomingPostsCard />
        </section>
    )
}
