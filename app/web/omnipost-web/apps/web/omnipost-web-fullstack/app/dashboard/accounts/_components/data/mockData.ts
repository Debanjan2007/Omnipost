export interface Account {
    id: string
    platform: "Instagram" | "Facebook" | "LinkedIn" | "Twitter/X" | "Threads" | "Bluesky" | "YouTube" | "TikTok" | "Pinterest" | "Mastodon"
    name: string
    username: string
    avatarUrl: string
    verified: boolean
    followerCount: string
    connectedStatus: "connected" | "disconnected"
    healthStatus: "excellent" | "good" | "warning" | "error"
    lastSync: string
    apiVersion: string
    permissionsSummary: string
    grantedPermissions: { name: string; granted: boolean; required: boolean }[]
    businessType: "Business" | "Personal" | "Creator"
    connectedSince: string
    tokenExpiry: string // e.g., "12 days" or "Expired"
    webhookStatus: "active" | "inactive"
    syncLogs: { time: string; event: string; status: "success" | "failed" }[]
}

export const SUPPORTED_PLATFORMS = [
    { name: "Instagram", desc: "Share photo posts, carousel feeds, and direct Reels", features: ["Media Upload", "Auto First Comment", "Analytics"] },
    { name: "Facebook", desc: "Publish to Business pages and interact with followers", features: ["Post Publishing", "Page Feed", "Direct Messaging"] },
    { name: "LinkedIn", desc: "Post updates to personal profile or company pages", features: ["Rich text articles", "Document attachments", "Organization Sync"] },
    { name: "Twitter/X", desc: "Post tweets, threads, and upload short videos", features: ["280-char Tweets", "Threads", "Direct Media Upload"] },
    { name: "Threads", desc: "Cross-post contents natively to Meta's Threads network", features: ["Text threads", "Image attachments", "Cross-posting"] },
    { name: "Bluesky", desc: "Decentralized AT-protocol text sharing platform", features: ["Text posts", "Rich link cards", "Custom feeds"] },
    { name: "YouTube", desc: "Upload high-quality videos, Shorts, and customize thumbnails", features: ["Video Upload", "Shorts categorization", "Analytics"] },
    { name: "TikTok", desc: "Publish short portrait-mode Reels and mobile videos", features: ["Reels & Videos", "Duet/Stitch settings", "Sound integration"] },
    { name: "Pinterest", desc: "Pin boards, graphics, infographics, and inspiration links", features: ["Pin Boards", "Inspiration Links", "Alt Description"] },
    { name: "Mastodon", desc: "Fediverse decentralized microblogging network", features: ["500-char posts", "CW warnings", "Custom emojis"] },
]

export const MOCK_ACCOUNTS: Account[] = [
    {
        id: "acc-1",
        platform: "Instagram",
        name: "OmniPost Hub",
        username: "@omnipost_hub",
        avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60",
        verified: true,
        followerCount: "14.2K",
        connectedStatus: "connected",
        healthStatus: "excellent",
        lastSync: "3 minutes ago",
        apiVersion: "v19.0 (Graph)",
        permissionsSummary: "Publish feeds, stories, analytics read access",
        businessType: "Business",
        connectedSince: "Jan 12, 2026",
        tokenExpiry: "58 days remaining",
        webhookStatus: "active",
        syncLogs: [
            { time: "10:45 AM", event: "Automated media sync", status: "success" },
            { time: "08:12 AM", event: "Follower stats crawl", status: "success" },
            { time: "Yesterday", event: "Access token validity check", status: "success" }
        ],
        grantedPermissions: [
            { name: "Publish Posts", granted: true, required: true },
            { name: "Upload Images", granted: true, required: true },
            { name: "Upload Videos", granted: true, required: true },
            { name: "Read Analytics", granted: true, required: true },
            { name: "Manage Comments", granted: true, required: false },
            { name: "Read Profile Info", granted: true, required: true }
        ]
    },
    {
        id: "acc-2",
        platform: "LinkedIn",
        name: "Debanjan Dey",
        username: "in/debanjan-dey",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debanjan&backgroundColor=b6e3f4",
        verified: false,
        followerCount: "3,480",
        connectedStatus: "connected",
        healthStatus: "good",
        lastSync: "12 minutes ago",
        apiVersion: "v2.0 (OAuth2)",
        permissionsSummary: "Publish updates, retrieve organizational details",
        businessType: "Personal",
        connectedSince: "Feb 04, 2026",
        tokenExpiry: "14 days remaining",
        webhookStatus: "active",
        syncLogs: [
            { time: "10:36 AM", event: "Profile feed sync", status: "success" },
            { time: "06:00 AM", event: "Company posts crawl", status: "success" }
        ],
        grantedPermissions: [
            { name: "Publish Posts", granted: true, required: true },
            { name: "Upload Images", granted: true, required: true },
            { name: "Upload Videos", granted: true, required: true },
            { name: "Read Analytics", granted: true, required: true },
            { name: "Manage Comments", granted: false, required: false },
            { name: "Read Profile Info", granted: true, required: true }
        ]
    },
    {
        id: "acc-3",
        platform: "Twitter/X",
        name: "Debanjan Dev",
        username: "@debanjan_x",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60",
        verified: true,
        followerCount: "6,812",
        connectedStatus: "connected",
        healthStatus: "warning",
        lastSync: "1 hour ago",
        apiVersion: "v2.1 (OAuth2)",
        permissionsSummary: "Post tweets, read account timeline, media upload",
        businessType: "Creator",
        connectedSince: "Jan 18, 2026",
        tokenExpiry: "Expired (needs reauth)",
        webhookStatus: "inactive",
        syncLogs: [
            { time: "09:40 AM", event: "Tweet sync check", status: "failed" },
            { time: "04:12 AM", event: "Followers count crawl", status: "success" }
        ],
        grantedPermissions: [
            { name: "Publish Posts", granted: false, required: true },
            { name: "Upload Images", granted: true, required: true },
            { name: "Upload Videos", granted: true, required: true },
            { name: "Read Analytics", granted: false, required: true },
            { name: "Manage Comments", granted: false, required: false },
            { name: "Read Profile Info", granted: true, required: true }
        ]
    },
    {
        id: "acc-4",
        platform: "YouTube",
        name: "OmniPost Devlogs",
        username: "c/omnipost_dev",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60",
        verified: false,
        followerCount: "2,420",
        connectedStatus: "connected",
        healthStatus: "excellent",
        lastSync: "45 minutes ago",
        apiVersion: "v3.0 (YouTube Data API)",
        permissionsSummary: "Video upload, edit metadata, thumbnail set",
        businessType: "Business",
        connectedSince: "Mar 10, 2026",
        tokenExpiry: "90 days remaining",
        webhookStatus: "active",
        syncLogs: [
            { time: "10:04 AM", event: "Video playlist update", status: "success" },
            { time: "09:00 AM", event: "Subscription sync", status: "success" }
        ],
        grantedPermissions: [
            { name: "Publish Posts", granted: true, required: true },
            { name: "Upload Images", granted: true, required: true },
            { name: "Upload Videos", granted: true, required: true },
            { name: "Read Analytics", granted: true, required: true },
            { name: "Manage Comments", granted: true, required: false },
            { name: "Read Profile Info", granted: true, required: true }
        ]
    },
    {
        id: "acc-5",
        platform: "Facebook",
        name: "OmniPost Main Page",
        username: "fb/omnipost_main",
        avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=60",
        verified: false,
        followerCount: "8.2K",
        connectedStatus: "disconnected",
        healthStatus: "error",
        lastSync: "3 days ago",
        apiVersion: "v19.0 (Graph)",
        permissionsSummary: "Manage pages, read stats, publish updates",
        businessType: "Business",
        connectedSince: "Dec 15, 2025",
        tokenExpiry: "Revoked by Owner",
        webhookStatus: "inactive",
        syncLogs: [
            { time: "3 days ago", event: "Token check", status: "failed" },
            { time: "4 days ago", event: "Daily sync", status: "success" }
        ],
        grantedPermissions: [
            { name: "Publish Posts", granted: false, required: true },
            { name: "Upload Images", granted: false, required: true },
            { name: "Upload Videos", granted: false, required: true },
            { name: "Read Analytics", granted: false, required: true },
            { name: "Manage Comments", granted: false, required: false },
            { name: "Read Profile Info", granted: false, required: true }
        ]
    }
]

export const RECENT_ACTIVITIES = [
    { id: "act-1", type: "connected", platform: "Instagram", desc: "OmniPost Hub (@omnipost_hub) successfully authorized", time: "10 minutes ago" },
    { id: "act-2", type: "refreshed", platform: "LinkedIn", desc: "Token refreshed for Debanjan Dey (in/debanjan-dey)", time: "1 hour ago" },
    { id: "act-3", type: "warning", platform: "Twitter/X", desc: "Twitter API limit warning. Rate limit refreshed.", time: "3 hours ago" },
    { id: "act-4", type: "sync", platform: "YouTube", desc: "Video playlist synchronized, 2 new items uploaded", time: "4 hours ago" },
    { id: "act-5", type: "error", platform: "Facebook", desc: "OAuth token revoked for OmniPost Main Page", time: "1 day ago" }
]

export const SYNC_STATUS_MOCK = {
    progress: 78,
    queued: 2,
    completed: 45,
    failed: 1,
    recentHistory: [
        { id: "s-1", platform: "Instagram", status: "completed", time: "10:45 AM" },
        { id: "s-2", platform: "LinkedIn", status: "completed", time: "10:36 AM" },
        { id: "s-3", platform: "YouTube", status: "completed", time: "10:04 AM" },
        { id: "s-4", platform: "Twitter/X", status: "failed", time: "09:40 AM" }
    ]
}
