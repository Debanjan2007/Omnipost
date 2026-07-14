// ─── Chart series data ────────────────────────────────────────────────────────

export const REACH  = [12,18,14,22,19,28,24,31,27,35,29,42,38,45,41,52,48,55,50,62,58,65,61,72,68,75,71,82,78,85]
export const LIKES  = [8,11,9,14,12,17,15,20,18,24,21,27,25,30,28,35,32,38,36,42,40,45,43,50,48,52,50,58,55,61]
export const CLICKS = [3,5,4,7,6,9,8,11,10,13,12,15,14,18,17,21,20,24,23,27,26,30,29,33,32,36,35,39,38,42]

export const X_AXIS_LABELS = ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"]

// ─── Tab configuration ────────────────────────────────────────────────────────

export const CHART_TABS = [
    { key: "reach"  as const, label: "Reach",  data: REACH,  color: "var(--primary)",         stat: "42.8K", change: "+8.3%"  },
    { key: "likes"  as const, label: "Likes",  data: LIKES,  color: "var(--color-success)",    stat: "18.6K", change: "+5.1%"  },
    { key: "clicks" as const, label: "Clicks", data: CLICKS, color: "var(--color-info)",        stat: "4.2K",  change: "+12.7%" },
] as const

export type ChartTabKey = (typeof CHART_TABS)[number]["key"]
