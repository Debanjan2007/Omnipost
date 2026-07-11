import { cn } from "@/lib/utils"

type Status = "Scheduled" | "Draft" | "Published"

const STATUS_STYLES: Record<Status, string> = {
    Scheduled: "bg-primary/10 text-primary",
    Draft:     "bg-muted text-muted-foreground",
    Published: "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]",
}

interface StatusBadgeProps {
    status: string
}

/**
 * StatusBadge — pill badge for post status.
 * Falls back to "Draft" styling for unrecognised values.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
    const cls = STATUS_STYLES[status as Status] ?? STATUS_STYLES.Draft

    return (
        <span className={cn(
            "shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap",
            cls,
        )}>
            {status}
        </span>
    )
}
