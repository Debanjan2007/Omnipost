import { AlertTriangle, Info } from "lucide-react"
import { PLATFORM_SPECS } from "../data/platforms"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { PanelCard } from "../ui/PanelCard"
import { cn } from "@/lib/utils"

interface WarningsPanelProps {
    selected: Set<string>
    charCount: number
}

const SEVERITY: Record<string, "warning" | "info"> = {
    "Image ratio must be 4:5 to 1.91:1":       "warning",
    "280 character limit":                       "warning",
    "Max 4 images per tweet":                    "info",
    "9:16 vertical video required":              "warning",
    "Title limit: 100 chars":                    "warning",
    "Use 3–5 hashtags for best reach":          "info",
    "Caption limit: 150 chars":                 "warning",
}

export function WarningsPanel({ selected, charCount }: WarningsPanelProps) {
    const activeWarnings = PLATFORM_SPECS
        .filter(p => selected.has(p.name))
        .flatMap(p => p.warnings.map(w => ({ platform: p.name, text: w })))

    // Extra dynamic warning for X character limit
    const xSelected = selected.has("Twitter/X")
    const xOverLimit = xSelected && charCount > 280

    const badge = activeWarnings.length > 0 || xOverLimit ? (
        <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--color-warning)_15%,transparent)] text-[var(--color-warning)] text-[10px] font-semibold">
            {activeWarnings.length + (xOverLimit ? 1 : 0)}
        </span>
    ) : undefined

    return (
        <PanelCard title="Warnings" icon={<AlertTriangle size={14}/>} badge={badge} defaultOpen={activeWarnings.length > 0}>
            <div className="px-3 py-3 space-y-2">
                {xOverLimit && (
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[color-mix(in_srgb,var(--color-error)_8%,transparent)] border border-[color-mix(in_srgb,var(--color-error)_20%,transparent)]">
                        <AlertTriangle size={12} className="mt-0.5 shrink-0 text-[var(--color-error)]"/>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-[var(--color-error)]">Twitter/X — {charCount}/280 chars</p>
                            <p className="text-[11px] text-muted-foreground">Content will be truncated on publish.</p>
                        </div>
                    </div>
                )}

                {activeWarnings.length === 0 && !xOverLimit && (
                    <div className="flex items-center gap-2 py-2 text-[var(--color-success)]">
                        <Info size={13}/>
                        <p className="text-xs">All selected platforms look good!</p>
                    </div>
                )}

                {activeWarnings.map((w, i) => {
                    const sev = SEVERITY[w.text] ?? "info"
                    return (
                        <div key={i} className={cn(
                            "flex items-start gap-2.5 p-2.5 rounded-xl border",
                            sev === "warning"
                                ? "bg-[color-mix(in_srgb,var(--color-warning)_8%,transparent)] border-[color-mix(in_srgb,var(--color-warning)_20%,transparent)]"
                                : "bg-muted/40 border-border/40",
                        )}>
                            <div className="shrink-0 mt-0.5">
                                <PlatformIcon name={w.platform} size={16}/>
                            </div>
                            <div className="min-w-0">
                                <p className={cn("text-[10px] font-semibold uppercase tracking-wider", sev === "warning" ? "text-[var(--color-warning)]" : "text-muted-foreground")}>{w.platform}</p>
                                <p className="text-xs text-foreground/80">{w.text}</p>
                            </div>
                            {sev === "warning"
                                ? <AlertTriangle size={12} className="shrink-0 text-[var(--color-warning)] mt-0.5 ml-auto"/>
                                : <Info size={12} className="shrink-0 text-muted-foreground mt-0.5 ml-auto"/>
                            }
                        </div>
                    )
                })}
            </div>
        </PanelCard>
    )
}
