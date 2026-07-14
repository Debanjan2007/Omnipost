import Link from "next/link"
import { FileText, Edit2, Plus, Upload, Sparkles, Plug } from "lucide-react"
import type { ReactNode } from "react"
import { RECENT_DRAFTS, QUICK_ACTIONS, type QuickAction } from "../data/content"
import { SectionCard, SectionTitle, ViewAll } from "../ui/SectionCard"
import { MiniCalendar } from "../ui/MiniCalendar"

// ─── Icon registry ────────────────────────────────────────────────────────────

const QUICK_ACTION_ICONS: Record<QuickAction["iconKey"], ReactNode> = {
    Plus:     <Plus size={16} />,
    Upload:   <Upload size={16} />,
    Sparkles: <Sparkles size={16} />,
    Plug:     <Plug size={16} />,
}

// ─── Recent Drafts card ───────────────────────────────────────────────────────

function DraftsCard() {
    return (
        <SectionCard className="p-5 flex flex-col gap-4">
            <SectionTitle action={<ViewAll href="/dashboard/create" />}>
                Recent Drafts
            </SectionTitle>

            <div className="flex flex-col gap-2">
                {RECENT_DRAFTS.map((draft, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <FileText size={13} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{draft.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                {draft.words} words · {draft.updated}
                            </p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0">
                            <Edit2 size={12} />
                        </button>
                    </div>
                ))}
            </div>
        </SectionCard>
    )
}

// ─── Quick Actions card ───────────────────────────────────────────────────────

function QuickActionsCard() {
    return (
        <SectionCard className="p-5 flex flex-col gap-4">
            <SectionTitle>Quick Actions</SectionTitle>

            <div className="grid grid-cols-2 gap-2.5">
                {QUICK_ACTIONS.map(action => (
                    <Link
                        key={action.iconKey}
                        href={action.href}
                        className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/50 hover:border-border transition-all text-center group"
                    >
                        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                            {QUICK_ACTION_ICONS[action.iconKey]}
                        </div>
                        <span className="text-xs font-medium text-foreground leading-tight">
                            {action.label}
                        </span>
                    </Link>
                ))}
            </div>
        </SectionCard>
    )
}

// ─── Calendar card ────────────────────────────────────────────────────────────

function CalendarCard() {
    return (
        <SectionCard className="p-5 flex flex-col gap-4">
            <SectionTitle action={<ViewAll href="/dashboard/history" label="Full view" />}>
                Content Calendar
            </SectionTitle>

            <MiniCalendar />

            <div className="flex items-center gap-4 pt-2 border-t border-border text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" /> Scheduled
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" style={{ filter: "brightness(1.4)" }} /> Today
                </span>
            </div>
        </SectionCard>
    )
}

// ─── Composed section ─────────────────────────────────────────────────────────

/**
 * ContentSection — three-column grid of Drafts, Quick Actions, and Calendar.
 * Each sub-card is an independent component for easy future replacement.
 */
export function ContentSection() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DraftsCard />
            <QuickActionsCard />
            <CalendarCard />
        </section>
    )
}
