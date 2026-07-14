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

export default function AccountsLoading() {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header skeleton */}
            <div className="shrink-0 border-b border-border bg-card/80 px-6 py-3.5 flex items-center justify-between gap-3">
                <div className="space-y-1.5">
                    <Sk className="h-4 w-44" />
                    <Sk className="h-3 w-64" />
                </div>
                <div className="flex gap-2">
                    <Sk className="h-8 w-24 rounded-xl" />
                    <Sk className="h-8 w-32 rounded-xl" />
                </div>
            </div>

            {/* Body skeleton */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
                
                {/* Metric grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <SkCard key={i} className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Sk className="h-3.5 w-24" />
                                <Sk className="w-7 h-7 rounded-xl" />
                            </div>
                            <div className="space-y-1.5">
                                <Sk className="h-6 w-16" />
                                <div className="flex justify-between">
                                    <Sk className="h-3 w-28" />
                                    <Sk className="h-3 w-10" />
                                </div>
                            </div>
                        </SkCard>
                    ))}
                </div>

                {/* Filter Search */}
                <SkCard className="py-3">
                    <div className="flex flex-col lg:flex-row gap-3 justify-between">
                        <Sk className="h-8 flex-1 rounded-xl" />
                        <div className="flex gap-2">
                            <Sk className="h-8 w-28 rounded-xl" />
                            <Sk className="h-8 w-36 rounded-xl" />
                            <Sk className="h-8 w-28 rounded-xl" />
                        </div>
                    </div>
                </SkCard>

                {/* Content grid columns */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4.5 items-start">
                    
                    {/* Left account cards list */}
                    <div className="xl:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <SkCard key={i} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Sk className="w-11 h-11 rounded-full" />
                                        <div className="space-y-1.5 flex-1">
                                            <Sk className="h-3 w-24" />
                                            <Sk className="h-2.5 w-16" />
                                        </div>
                                        <Sk className="h-5 w-14 rounded-full" />
                                    </div>
                                    <div className="space-y-2 border-t border-b border-border/40 py-3">
                                        <div className="flex justify-between"><Sk className="h-3 w-20" /><Sk className="h-3 w-24" /></div>
                                        <div className="flex justify-between"><Sk className="h-3 w-24" /><Sk className="h-3 w-20" /></div>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <Sk className="h-7 w-16 rounded-lg" />
                                        <div className="flex gap-1.5">
                                            <Sk className="h-7 w-16 rounded-lg" />
                                            <Sk className="h-7 w-14 rounded-lg" />
                                        </div>
                                    </div>
                                </SkCard>
                            ))}
                        </div>
                    </div>

                    {/* Right side panels */}
                    <div className="space-y-4.5">
                        <SkCard className="space-y-3">
                            <Sk className="h-4 w-28" />
                            <Sk className="h-24 w-full rounded-xl" />
                        </SkCard>
                        <SkCard className="space-y-3">
                            <Sk className="h-4 w-28" />
                            <Sk className="h-16 w-full rounded-xl" />
                        </SkCard>
                    </div>

                </div>

            </div>
        </div>
    )
}
