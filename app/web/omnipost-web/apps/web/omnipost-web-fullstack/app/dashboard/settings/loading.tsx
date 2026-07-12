"use client"

// ─── Loading Skeleton Atoms ──────────────────────────────────────────────────

function Sk({ className }: { className?: string }) {
    return <div className={`animate-pulse rounded-lg bg-muted/70 ${className ?? ""}`} />
}

function SkCard({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`bg-card border border-border rounded-2xl p-5 overflow-hidden ${className ?? ""}`}>
            {children}
        </div>
    )
}

export default function SettingsLoading() {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header skeleton */}
            <div className="shrink-0 border-b border-border bg-card/80 px-5 py-4 flex items-center justify-between gap-3">
                <div className="space-y-1.5">
                    <Sk className="h-4 w-28" />
                    <Sk className="h-3 w-[450px]" />
                </div>
            </div>

            {/* Body skeleton */}
            <div className="flex-1 flex overflow-hidden min-h-0">
                {/* Left sidebar nav skeleton */}
                <aside className="hidden md:block w-56 lg:w-64 border-r border-border p-4.5 space-y-2 bg-muted/5">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2">
                            <Sk className="w-4 h-4" />
                            <Sk className="h-3 w-28" />
                        </div>
                    ))}
                </aside>

                {/* Right panel settings form skeleton */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-2xl mx-auto space-y-6">
                        
                        <SkCard className="space-y-5">
                            <div className="space-y-1.5">
                                <Sk className="h-4 w-32" />
                                <Sk className="h-3 w-64" />
                            </div>
                            <div className="h-px bg-border/40" />
                            <div className="flex items-center gap-4">
                                <Sk className="w-14 h-14 rounded-full" />
                                <div className="space-y-1.5">
                                    <Sk className="h-7 w-24 rounded-lg" />
                                    <Sk className="h-2.5 w-36" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1"><Sk className="h-3 w-20" /><Sk className="h-8 w-full rounded-lg" /></div>
                                <div className="space-y-1"><Sk className="h-3 w-20" /><Sk className="h-8 w-full rounded-lg" /></div>
                                <div className="space-y-1 md:col-span-2"><Sk className="h-3 w-20" /><Sk className="h-8 w-full rounded-lg" /></div>
                                <div className="space-y-1 md:col-span-2"><Sk className="h-3 w-20" /><Sk className="h-20 w-full rounded-lg" /></div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <Sk className="h-8 w-28 rounded-xl" />
                            </div>
                        </SkCard>

                    </div>
                </main>
            </div>
        </div>
    )
}
