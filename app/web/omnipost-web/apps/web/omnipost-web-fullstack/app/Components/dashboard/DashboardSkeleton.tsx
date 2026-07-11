import { cn } from "@/lib/utils"

// ─── Base skeleton atom ────────────────────────────────────────────────────────

function Sk({ className }: { className?: string }) {
    return <div className={cn("animate-pulse rounded-lg bg-muted/70", className)} />
}

// ─── Section shells (identical padding/radius to real sections) ───────────────

function SkCard({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn("bg-card border border-border rounded-2xl p-5", className)}>
            {children}
        </div>
    )
}

// ─── Skeleton sections ────────────────────────────────────────────────────────

function HeroSkeleton() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2.5">
                <Sk className="h-8 w-56 rounded-xl" />
                <Sk className="h-4 w-80" />
            </div>
            <div className="flex gap-2.5">
                <Sk className="h-9 w-28 rounded-xl" />
                <Sk className="h-9 w-24 rounded-xl" />
            </div>
        </div>
    )
}

function AnalyticsCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <SkCard key={i} className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                            <Sk className="w-8 h-8 rounded-lg" />
                            <Sk className="h-3.5 w-24" />
                        </div>
                        <Sk className="h-7 w-[72px] rounded-md" />
                    </div>
                    <div className="space-y-1.5">
                        <Sk className="h-8 w-16 rounded-lg" />
                        <Sk className="h-3 w-28" />
                    </div>
                </SkCard>
            ))}
        </div>
    )
}

function ChartSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Chart card */}
            <SkCard className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1.5">
                        <Sk className="h-4 w-36" />
                        <Sk className="h-3 w-20" />
                    </div>
                    {/* Tab switcher */}
                    <Sk className="h-8 w-40 rounded-lg" />
                </div>
                <Sk className="h-7 w-24 rounded-lg" />
                {/* Chart area */}
                <Sk className="h-[140px] w-full rounded-xl" />
                <div className="flex justify-between">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Sk key={i} className="h-2.5 w-10" />
                    ))}
                </div>
            </SkCard>

            {/* Upcoming posts */}
            <SkCard className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <Sk className="h-4 w-28" />
                    <Sk className="h-3.5 w-14" />
                </div>
                <div className="flex flex-col gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl">
                            <Sk className="w-7 h-7 rounded-lg shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <Sk className="h-3.5 w-full" />
                                <Sk className="h-2.5 w-20" />
                            </div>
                            <Sk className="h-5 w-16 rounded-full" />
                        </div>
                    ))}
                </div>
            </SkCard>
        </div>
    )
}

function ContentCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Drafts */}
            <SkCard className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <Sk className="h-4 w-24" />
                    <Sk className="h-3.5 w-14" />
                </div>
                <div className="flex flex-col gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border/40">
                            <Sk className="w-8 h-8 rounded-lg shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <Sk className="h-3.5 w-full" />
                                <Sk className="h-2.5 w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            </SkCard>

            {/* Quick Actions */}
            <SkCard className="flex flex-col gap-4">
                <Sk className="h-4 w-24" />
                <div className="grid grid-cols-2 gap-2.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-border/40 bg-muted/20">
                            <Sk className="w-9 h-9 rounded-xl" />
                            <Sk className="h-3 w-16" />
                        </div>
                    ))}
                </div>
            </SkCard>

            {/* Calendar */}
            <SkCard className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <Sk className="h-4 w-28" />
                    <Sk className="h-3.5 w-16" />
                </div>
                <div className="space-y-2">
                    <Sk className="h-3 w-24" />
                    <div className="grid grid-cols-7 gap-1 mt-2">
                        {Array.from({ length: 35 }).map((_, i) => (
                            <Sk key={i} className="h-6 w-6 mx-auto rounded-full" />
                        ))}
                    </div>
                </div>
            </SkCard>
        </div>
    )
}

function ActivitySkeleton() {
    return (
        <SkCard className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <Sk className="h-4 w-28" />
                <Sk className="h-3.5 w-14" />
            </div>
            <div className="relative flex flex-col gap-0">
                <div className="absolute left-[6px] top-3 bottom-3 w-px bg-border/50" />
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                        <Sk className="relative z-10 mt-1 w-3 h-3 rounded-full shrink-0" />
                        <div className="flex-1 space-y-1.5">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Sk className="w-5 h-5 rounded-md shrink-0" />
                                    <Sk className="h-3.5 w-40" />
                                </div>
                                <Sk className="h-3 w-16 shrink-0" />
                            </div>
                            <Sk className="h-3 w-64 ml-7" />
                        </div>
                    </div>
                ))}
            </div>
        </SkCard>
    )
}

function PlatformsSkeleton() {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <Sk className="h-4 w-36" />
                <Sk className="h-3.5 w-20" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-3">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                            <Sk className="w-9 h-9 rounded-xl" />
                            <Sk className="h-4 w-8 rounded-full" />
                        </div>
                        <div className="space-y-1.5">
                            <Sk className="h-3.5 w-16" />
                            <Sk className="h-3 w-20" />
                        </div>
                        <Sk className="h-3 w-14" />
                        <Sk className="h-7 w-full rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    )
}

function AISkeleton() {
    return (
        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                {/* Prompt area */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2.5">
                        <Sk className="w-9 h-9 rounded-xl shrink-0" />
                        <div className="space-y-1.5">
                            <Sk className="h-4 w-24" />
                            <Sk className="h-3 w-40" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Sk className="flex-1 h-10 rounded-xl" />
                        <Sk className="h-10 w-24 rounded-xl" />
                    </div>
                </div>
                {/* Suggestions */}
                <div className="lg:w-80 space-y-3">
                    <Sk className="h-3 w-20" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Sk key={i} className="h-10 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─── Composed dashboard skeleton ──────────────────────────────────────────────

/**
 * DashboardSkeleton
 *
 * Server-renderable loading placeholder that mirrors DashboardOverview's
 * layout exactly. Used by app/dashboard/loading.tsx via Next.js Suspense.
 */
export function DashboardSkeleton() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 max-w-[1400px] mx-auto">
            <HeroSkeleton />
            <AnalyticsCardsSkeleton />
            <ChartSkeleton />
            <ContentCardsSkeleton />
            <ActivitySkeleton />
            <PlatformsSkeleton />
            <AISkeleton />
        </div>
    )
}
