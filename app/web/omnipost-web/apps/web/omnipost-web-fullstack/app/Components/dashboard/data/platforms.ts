// ─── Types ────────────────────────────────────────────────────────────────────

export interface Platform {
    name:      string
    connected: boolean
    followers: string
    sync:      string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const CONNECTED_PLATFORMS: Platform[] = [
    { name: "Instagram", connected: true,  followers: "12.4K", sync: "2 min ago"  },
    { name: "Facebook",  connected: true,  followers: "8.2K",  sync: "5 min ago"  },
    { name: "LinkedIn",  connected: true,  followers: "3.1K",  sync: "10 min ago" },
    { name: "Twitter/X", connected: true,  followers: "6.8K",  sync: "15 min ago" },
    { name: "Threads",   connected: false, followers: "—",     sync: "Never"      },
    { name: "Bluesky",   connected: false, followers: "—",     sync: "Never"      },
    { name: "YouTube",   connected: true,  followers: "2.4K",  sync: "1 hr ago"   },
]
