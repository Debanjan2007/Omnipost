import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// Small presentational atoms shared across the Create Post sections.
// All are controlled (no internal state) so they can live in either boundary;
// they're consumed inside client sections.
// ─────────────────────────────────────────────────────────────────────────────

/** Shared text-field styling — matches the dashboard's inputs. */
export const fieldClass =
    "w-full rounded-xl bg-background border border-input text-sm text-foreground " +
    "placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-ring/50 " +
    "transition-all"

// ─── Panel (card shell) ─────────────────────────────────────────────────────

export function Panel({
    className,
    children,
    id,
}: { className?: string; children: ReactNode; id?: string }) {
    return (
        <section
            id={id}
            className={cn(
                "bg-card border border-border rounded-2xl shadow-sm shadow-black/[0.02]",
                className,
            )}
        >
            {children}
        </section>
    )
}

// ─── Panel header ───────────────────────────────────────────────────────────

interface PanelHeaderProps {
    icon:      LucideIcon
    title:     string
    subtitle?: string
    action?:   ReactNode
    className?: string
}

export function PanelHeader({ icon: Icon, title, subtitle, action, className }: PanelHeaderProps) {
    return (
        <div className={cn("flex items-start justify-between gap-3", className)}>
            <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={16} />
                </span>
                <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-foreground truncate">{title}</h2>
                    {subtitle && (
                        <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p>
                    )}
                </div>
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    )
}

// ─── Toggle switch ────────────────────────────────────────────────────────────

export function Switch({
    checked,
    onChange,
    label,
}: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={cn(
                "relative h-5 w-9 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                checked ? "bg-primary" : "bg-muted",
            )}
        >
            <span
                className={cn(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                    checked ? "translate-x-[18px]" : "translate-x-0.5",
                )}
            />
        </button>
    )
}

// ─── Segmented control ────────────────────────────────────────────────────────

interface SegmentedProps<T extends string> {
    options:  { value: T; label: string }[]
    value:    T
    onChange: (v: T) => void
    className?: string
}

export function Segmented<T extends string>({ options, value, onChange, className }: SegmentedProps<T>) {
    return (
        <div className={cn("inline-flex rounded-xl bg-muted/60 p-0.5", className)}>
            {options.map(opt => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(opt.value)}
                    className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                        value === opt.value
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    )
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

export function Chip({
    children,
    onRemove,
    onClick,
    tone = "solid",
}: {
    children: ReactNode
    onRemove?: () => void
    onClick?: () => void
    tone?: "solid" | "ghost"
}) {
    const base =
        "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors"
    if (onClick) {
        return (
            <button type="button" onClick={onClick}
                className={cn(base, "border border-dashed border-border text-muted-foreground hover:border-primary/40 hover:text-foreground")}>
                {children}
            </button>
        )
    }
    return (
        <span className={cn(base, tone === "solid" ? "bg-primary/10 text-primary" : "bg-muted text-foreground")}>
            {children}
            {onRemove && (
                <button type="button" onClick={onRemove}
                    className="ml-0.5 -mr-0.5 text-current/70 hover:text-current" aria-label="Remove">
                    ×
                </button>
            )}
        </span>
    )
}

// ─── Empty state ────────────────────────────────────────────────────────────

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: { icon: LucideIcon; title: string; description: string; action?: ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-8 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <Icon size={18} />
            </span>
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="max-w-xs text-xs text-muted-foreground">{description}</p>
            {action && <div className="mt-1">{action}</div>}
        </div>
    )
}
