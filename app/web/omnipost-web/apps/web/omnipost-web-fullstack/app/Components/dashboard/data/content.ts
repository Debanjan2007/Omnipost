// ─── Types ────────────────────────────────────────────────────────────────────

export interface UpcomingPost {
    platform: string
    title:    string
    date:     string
    status:   "Scheduled" | "Draft" | "Published"
}

export interface Draft {
    title:     string
    platforms: string[]
    updated:   string
    words:     number
}

export interface QuickAction {
    iconKey: "Plus" | "Upload" | "Sparkles" | "Plug"
    label:   string
    href:    string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const UPCOMING_POSTS: UpcomingPost[] = [
    { platform: "Instagram", title: "Summer Collection Launch",  date: "Today, 3:00 PM",    status: "Scheduled" },
    { platform: "LinkedIn",  title: "Q3 Report Highlights",      date: "Tomorrow, 9:00 AM", status: "Scheduled" },
    { platform: "Twitter/X", title: "Product Update Thread",     date: "Jul 15, 2:30 PM",   status: "Draft"     },
    { platform: "Facebook",  title: "Community Event Recap",     date: "Jul 16, 11:00 AM",  status: "Scheduled" },
    { platform: "Threads",   title: "Behind the Scenes Series",  date: "Jul 17, 6:00 PM",   status: "Scheduled" },
]

export const RECENT_DRAFTS: Draft[] = [
    { title: "Product Launch Teaser",   platforms: ["Instagram", "Facebook"], updated: "2 hours ago", words: 142 },
    { title: "Weekly Newsletter Recap", platforms: ["LinkedIn"],              updated: "5 hours ago", words: 387 },
    { title: "Behind the Scenes",       platforms: ["Instagram", "Threads"],  updated: "Yesterday",   words: 89  },
]

export const QUICK_ACTIONS: QuickAction[] = [
    { iconKey: "Plus",     label: "Create Post",      href: "/dashboard/create"           },
    { iconKey: "Upload",   label: "Upload Media",     href: "/dashboard/create?tab=media" },
    { iconKey: "Sparkles", label: "AI Caption",       href: "/dashboard/create?tab=ai"    },
    { iconKey: "Plug",     label: "Connect Platform", href: "/dashboard/accounts"         },
]

/** Days of the current month that have scheduled posts (1-indexed). */
export const SCHEDULED_DAYS = new Set([3, 7, 10, 12, 15, 18, 20, 21, 24, 28])
