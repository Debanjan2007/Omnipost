"use client"

// ─── Loading Skeleton Atoms ──────────────────────────────────────────────────

function Sk({ className }: { className?: string }) {
    return <div className={`animate-pulse rounded-lg bg-muted/70 ${className ?? ""}`} />
}

function SkCard({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`bg-card border border-border rounded-2xl p-4 overflow-hidden ${className ?? ""}`}>
            {children}
        </div>
    )
}

export default function HistoryLoading() {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header skeleton */}
            <div className="shrink-0 border-b border-border bg-card/85 px-5 py-3.5 flex items-center justify-between gap-3">
                <div className="space-y-1.5">
                    <Sk className="h-4 w-40" />
                    <Sk className="h-3 w-72" />
                </div>
                <div className="flex gap-2">
                    <Sk className="h-8 w-24 rounded-xl" />
                    <Sk className="h-8 w-32 rounded-xl" />
                </div>
            </div>

            {/* Body skeleton */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                
                {/* Metric grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkCard key={i} className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Sk className="h-3.5 w-24" />
                                <Sk className="w-7 h-7 rounded-xl" />
                            </div>
                            <div className="space-y-1.5">
                                <Sk className="h-6 w-16" />
                                <Sk className="h-3 w-28" />
                            </div>
                        </SkCard>
                    ))}
                </div>

                {/* Filter Search */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                    <Sk className="h-8 w-full sm:w-64 rounded-full" />
                    <div className="flex gap-2">
                        <Sk className="h-8 w-28 rounded-full" />
                        <Sk className="h-8 w-32 rounded-full" />
                        <Sk className="h-8 w-36 rounded-full" />
                    </div>
                </div>

                {/* Timeline rows list skeleton */}
                <div className="border border-border/60 rounded-2xl bg-card overflow-hidden divide-y divide-border/40">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4.5">
                            <div className="flex items-start gap-3.5 flex-1">
                                <Sk className="w-9 h-9 rounded-lg" />
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <Sk className="h-3.5 w-44" />
                                        <Sk className="h-4 w-16 rounded-full" />
                                    </div>
                                    <Sk className="h-3 w-96" />
                                    <div className="flex items-center gap-2">
                                        <Sk className="h-2.5 w-28" />
                                        <Sk className="h-2.5 w-20" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Sk className="h-7 w-16 rounded-lg" />
                                <Sk className="h-7 w-7 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
