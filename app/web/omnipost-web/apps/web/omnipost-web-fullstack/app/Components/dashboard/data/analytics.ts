// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnalyticsCard {
    title:   string
    value:   string
    trend:   string
    up:      boolean
    iconKey: "CalendarDays" | "CheckCircle2" | "Plug" | "Globe"
    spark:   number[]
    color:   string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const ANALYTICS_CARDS: AnalyticsCard[] = [
    {
        title:   "Scheduled Posts",
        value:   "24",
        trend:   "+12% this week",
        up:      true,
        iconKey: "CalendarDays",
        spark:   [4, 6, 5, 8, 7, 9, 8, 10, 11, 13],
        color:   "var(--primary)",
    },
    {
        title:   "Published Today",
        value:   "6",
        trend:   "+3 from yesterday",
        up:      true,
        iconKey: "CheckCircle2",
        spark:   [2, 3, 2, 4, 3, 5, 4, 6, 5, 7],
        color:   "var(--color-success)",
    },
    {
        title:   "Connected Accounts",
        value:   "7",
        trend:   "2 platforms pending",
        up:      false,
        iconKey: "Plug",
        spark:   [3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
        color:   "var(--color-info)",
    },
    {
        title:   "Total Reach",
        value:   "142K",
        trend:   "+8.3% this month",
        up:      true,
        iconKey: "Globe",
        spark:   [60, 72, 68, 80, 75, 92, 88, 100, 110, 120],
        color:   "var(--color-data-violet)",
    },
]
