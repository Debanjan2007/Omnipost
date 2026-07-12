interface SkProps extends React.ComponentPropsWithoutRef<"div"> {
    className?: string
}

function Sk({ className, ...props }: SkProps) {
    return <div className={`animate-pulse rounded-lg bg-muted/70 ${className ?? ""}`} {...props}/>
}

function SkCard({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`bg-card border border-border rounded-2xl overflow-hidden ${className ?? ""}`}>
            {children}
        </div>
    )
}

// ─── Skeleton sections ────────────────────────────────────────────────────────

function ComposerSkeleton() {
    return (
        <SkCard>
            <div className="flex items-center gap-1 px-3 py-2.5 border-b border-border/60">
                {Array.from({ length: 7 }).map((_, i) => <Sk key={i} className="w-7 h-7 rounded-lg"/>)}
                <div className="ml-auto"><Sk className="w-16 h-4"/></div>
            </div>
            <div className="px-4 py-4 space-y-2.5">
                {[60,90,45,80,35].map((w, i) => <Sk key={i} className={`h-4`} style={{ width: `${w}%` } as React.CSSProperties}/>)}
            </div>
            <div className="flex justify-between px-4 py-2 border-t border-border/50">
                <Sk className="h-3 w-28"/>
                <Sk className="h-3 w-16"/>
            </div>
        </SkCard>
    )
}

function MediaSkeleton() {
    return (
        <SkCard>
            <div className="px-4 py-3 border-b border-border/60 flex justify-between">
                <Sk className="h-4 w-20"/>
                <Sk className="h-4 w-14"/>
            </div>
            <div className="m-4 border-2 border-dashed border-border/60 rounded-xl p-6 flex flex-col items-center gap-3">
                <Sk className="w-10 h-10 rounded-xl"/>
                <Sk className="h-4 w-48"/>
                <Sk className="h-3 w-64"/>
            </div>
        </SkCard>
    )
}

function PanelSkeleton({ rows = 3 }: { rows?: number }) {
    return (
        <SkCard>
            <div className="px-4 py-3 flex justify-between">
                <Sk className="h-4 w-28"/>
                <Sk className="w-4 h-4 rounded"/>
            </div>
            <div className="border-t border-border/50 px-4 py-3 space-y-2.5">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Sk className="w-8 h-8 rounded-xl"/>
                        <div className="flex-1 space-y-1.5">
                            <Sk className="h-3 w-24"/>
                            <Sk className="h-2.5 w-16"/>
                        </div>
                        <Sk className="w-8 h-4 rounded-full"/>
                    </div>
                ))}
            </div>
        </SkCard>
    )
}

// ─── Main skeleton ────────────────────────────────────────────────────────────

/**
 * loading.tsx — Next.js automatic Suspense boundary for /dashboard/create.
 * Mirrors the two-column layout exactly so there's no layout shift on load.
 */
export default function CreateLoading() {
    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Header skeleton */}
            <div className="shrink-0 border-b border-border bg-card/80 px-5 py-3 flex items-center justify-between gap-3">
                <div className="space-y-1.5">
                    <Sk className="h-4 w-36"/>
                    <Sk className="h-3 w-52"/>
                </div>
                <div className="flex gap-2">
                    {[80, 72, 80, 96].map((w, i) => <Sk key={i} className="h-8 rounded-xl" style={{ width: w } as React.CSSProperties}/>)}
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex overflow-hidden min-h-0">
                {/* Left */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <ComposerSkeleton/>
                    <MediaSkeleton/>
                </div>

                {/* Right — desktop only */}
                <aside className="hidden lg:flex flex-col w-[340px] border-l border-border overflow-y-auto p-4 space-y-3">
                    <PanelSkeleton rows={5}/>
                    <PanelSkeleton rows={3}/>
                    <PanelSkeleton rows={4}/>
                </aside>
            </div>
        </div>
    )
}
