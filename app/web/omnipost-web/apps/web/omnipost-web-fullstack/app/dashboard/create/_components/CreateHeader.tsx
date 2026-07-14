"use client"

import { BookMarked, Calendar, Eye, Sparkles, Save } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateHeaderProps {
    savedStatus: "idle" | "saving" | "saved"
    onPublish:   () => void
    onSchedule:  () => void
    onDraft:     () => void
    onPreview:   () => void
}

/** Status pill shown beside the title */
function SavedBadge({ status }: { status: CreateHeaderProps["savedStatus"] }) {
    if (status === "idle") return null
    return (
        <span className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 transition-all",
            status === "saving" && "bg-muted text-muted-foreground",
            status === "saved"  && "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]",
        )}>
            <span className={cn("w-1.5 h-1.5 rounded-full", status === "saving" ? "bg-muted-foreground animate-pulse" : "bg-[var(--color-success)]")} />
            {status === "saving" ? "Saving…" : "Saved"}
        </span>
    )
}

/**
 * CreateHeader — full-width top bar for the Create Post page.
 * Collapses action labels to icon-only on narrow viewports.
 */
export function CreateHeader({ savedStatus, onPublish, onSchedule, onDraft, onPreview }: CreateHeaderProps) {
    return (
        <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-4 sm:px-5 lg:px-6 py-3 flex items-center justify-between gap-3">
            {/* ── Left: title ──────────────────────────────────────── */}
            <div className="flex items-center gap-3 min-w-0">
                <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <h1 className="text-base font-bold text-foreground tracking-tight whitespace-nowrap">
                            Create New Post
                        </h1>
                        <SavedBadge status={savedStatus} />
                    </div>
                    <p className="text-[11px] text-muted-foreground hidden sm:block">
                        Create once and publish everywhere.
                    </p>
                </div>
            </div>

            {/* ── Right: actions ───────────────────────────────────── */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Save Draft */}
                <button
                    onClick={onDraft}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted text-xs font-medium transition-all"
                >
                    <Save size={13} />
                    <span className="hidden sm:inline">Save Draft</span>
                </button>

                {/* Preview */}
                <button
                    onClick={onPreview}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted text-xs font-medium transition-all"
                >
                    <Eye size={13} />
                    <span className="hidden sm:inline">Preview</span>
                </button>

                {/* Schedule */}
                <button
                    onClick={onSchedule}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-border bg-transparent text-foreground hover:bg-muted text-xs font-medium transition-all"
                >
                    <Calendar size={13} />
                    <span className="hidden md:inline">Schedule</span>
                </button>

                {/* Publish Now */}
                <button
                    onClick={onPublish}
                    className="inline-flex items-center gap-1.5 h-8 px-3 sm:px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <Sparkles size={13} />
                    <span className="hidden xs:inline">Publish Now</span>
                    <span className="inline xs:hidden">Publish</span>
                </button>
            </div>
        </header>
    )
}
