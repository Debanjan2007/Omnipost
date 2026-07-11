// ─── Types ────────────────────────────────────────────────────────────────────

export interface ActivityItem {
    platform: string
    text:     string
    sub:      string
    time:     string
    type:     "success" | "scheduled" | "draft"
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const ACTIVITY_ITEMS: ActivityItem[] = [
    { platform: "Instagram", text: "Instagram Post Published", sub: "Summer Sale Campaign • 234 likes, 42 comments",  time: "5 min ago",  type: "success"   },
    { platform: "LinkedIn",  text: "LinkedIn Post Scheduled",  sub: "Company Update — set for Jul 15 at 9:00 AM",    time: "1 hr ago",   type: "scheduled" },
    { platform: "Twitter/X", text: "Twitter Draft Saved",      sub: "Product Update thread • 5 tweets drafted",      time: "3 hrs ago",  type: "draft"     },
    { platform: "YouTube",   text: "YouTube Upload Finished",  sub: "Q2 Marketing Review • Processing complete",     time: "Yesterday",  type: "success"   },
    { platform: "Facebook",  text: "Facebook Post Published",  sub: "Community Spotlight • 89 likes, 17 shares",     time: "Yesterday",  type: "success"   },
]

export const AI_SUGGESTIONS = [
    "Best time to post on Instagram today: 6–8 PM on weekdays",
    "Your LinkedIn posts on Tuesdays get 3× more reach",
    "Carousel posts drive 3× more saves than single images",
] as const
