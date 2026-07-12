import { CheckCircle2, Circle, AlertCircle, ListChecks } from "lucide-react"
import type { MediaFile } from "./MediaUpload"
import { PanelCard } from "../ui/PanelCard"
import { cn } from "@/lib/utils"

interface ChecklistPanelProps {
    content:       string
    files:         MediaFile[]
    selected:      Set<string>
    scheduledDate: string
    tags:          string[]
}

interface CheckItem {
    label:    string
    pass:     boolean
    optional?: boolean
    warning?: boolean
}

function CheckRow({ item }: { item: CheckItem }) {
    return (
        <div className="flex items-center gap-3 py-1.5">
            <div className="shrink-0">
                {item.pass ? (
                    <CheckCircle2 size={15} className="text-[var(--color-success)]"/>
                ) : item.warning ? (
                    <AlertCircle  size={15} className="text-[var(--color-warning)]"/>
                ) : (
                    <Circle size={15} className="text-border"/>
                )}
            </div>
            <p className={cn(
                "text-xs flex-1",
                item.pass    ? "text-foreground"
              : item.warning ? "text-[var(--color-warning)]"
              : "text-muted-foreground",
            )}>
                {item.label}
            </p>
            {item.optional && !item.pass && (
                <span className="text-[10px] text-muted-foreground/50 italic">optional</span>
            )}
        </div>
    )
}

/**
 * ChecklistPanel — pre-publish checklist computed from live state.
 * Shows a progress bar and "Ready to publish" when all required items pass.
 */
export function ChecklistPanel({ content, files, selected, scheduledDate, tags }: ChecklistPanelProps) {
    const altAllSet = files.length === 0 || files.every(f => f.altText.length > 0)
    const twitterOk = !selected.has("Twitter/X") || content.length <= 280
    const ygOk      = !selected.has("YouTube")   || content.length <= 100

    const items: CheckItem[] = [
        { label: "Caption written",             pass: content.trim().length > 0 },
        { label: "Platforms selected",          pass: selected.size > 0 },
        { label: "Media added",                 pass: files.length > 0,       optional: true },
        { label: "Tags added",                  pass: tags.length > 0,        optional: true },
        { label: "Schedule set",                pass: scheduledDate.length > 0, optional: true },
        { label: "Alt text on all media",       pass: altAllSet,              warning: !altAllSet && files.length > 0 },
        { label: "Twitter/X within 280 chars",  pass: twitterOk,              warning: !twitterOk },
        { label: "YouTube title within 100",    pass: ygOk,                   warning: !ygOk },
    ]

    const required  = items.filter(i => !i.optional)
    const passed    = required.filter(i => i.pass).length
    const pct       = Math.round((passed / required.length) * 100)
    const allGood   = pct === 100

    const badge = (
        <span className={cn(
            "ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
            allGood
                ? "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]"
                : "bg-muted text-muted-foreground",
        )}>
            {passed}/{required.length}
        </span>
    )

    return (
        <PanelCard title="Pre-Publish Checklist" icon={<ListChecks size={14}/>} badge={badge}>
            <div className="px-4 py-3 space-y-1">
                {/* Progress bar */}
                <div className="flex items-center gap-2 pb-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${pct}%`,
                                background: allGood ? "var(--color-success)" : "var(--primary)",
                            }}
                        />
                    </div>
                    <span className="text-[11px] font-medium tabular-nums text-muted-foreground w-8 text-right">{pct}%</span>
                </div>

                <div className="divide-y divide-border/30">
                    {items.map(item => <CheckRow key={item.label} item={item}/>)}
                </div>

                {allGood && (
                    <div className="mt-3 flex items-center gap-2 p-2.5 bg-[color-mix(in_srgb,var(--color-success)_8%,transparent)] border border-[color-mix(in_srgb,var(--color-success)_20%,transparent)] rounded-xl">
                        <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0"/>
                        <p className="text-xs text-[var(--color-success)] font-medium">Ready to publish!</p>
                    </div>
                )}
            </div>
        </PanelCard>
    )
}
