// ─── Platform-specific configuration for the Create Post page ─────────────────

export interface PlatformSpec {
    name:        string
    charLimit:   number | null
    imageRatio:  string
    maxImages:   number
    connected:   boolean
    followers:   string
    handle:      string
    warnings:    string[]
    settings:    { label: string; on: boolean }[]
}

export const PLATFORM_SPECS: PlatformSpec[] = [
    {
        name: "Instagram", charLimit: 2200, imageRatio: "1:1 or 4:5", maxImages: 10,
        connected: true, followers: "12.4K", handle: "@omnipost",
        warnings: ["Image ratio must be 4:5 to 1.91:1", "Alt text strongly recommended"],
        settings: [
            { label: "Share to Stories", on: false },
            { label: "Auto first comment", on: true },
            { label: "Share to Reels", on: false },
        ],
    },
    {
        name: "Facebook", charLimit: 63206, imageRatio: "1.91:1", maxImages: 30,
        connected: true, followers: "8.2K", handle: "OmniPost Page",
        warnings: ["Optimal image ratio: 1.91:1"],
        settings: [
            { label: "Post to Page", on: true },
            { label: "Boost after publish", on: false },
        ],
    },
    {
        name: "LinkedIn", charLimit: 3000, imageRatio: "1.91:1", maxImages: 9,
        connected: true, followers: "3.1K", handle: "Debanjan",
        warnings: ["Use 3–5 hashtags for best reach", "Tag companies when relevant"],
        settings: [
            { label: "Post as Organization", on: false },
            { label: "Notify connections", on: true },
        ],
    },
    {
        name: "Twitter/X", charLimit: 280, imageRatio: "16:9", maxImages: 4,
        connected: true, followers: "6.8K", handle: "@debanjan_x",
        warnings: ["280 character limit", "Max 4 images per tweet"],
        settings: [
            { label: "Add to Thread", on: false },
            { label: "Sensitive content warning", on: false },
        ],
    },
    {
        name: "Threads", charLimit: 500, imageRatio: "1:1", maxImages: 10,
        connected: false, followers: "—", handle: "@debanjan",
        warnings: ["500 character limit"],
        settings: [{ label: "Cross-post to Instagram", on: false }],
    },
    {
        name: "Bluesky", charLimit: 300, imageRatio: "1:1", maxImages: 4,
        connected: false, followers: "—", handle: "@debanjan.bsky",
        warnings: ["300 character limit"],
        settings: [],
    },
    {
        name: "YouTube", charLimit: 100, imageRatio: "16:9", maxImages: 1,
        connected: true, followers: "2.4K", handle: "OmniPost Channel",
        warnings: ["Title limit: 100 chars", "Description limit: 5000 chars"],
        settings: [
            { label: "Upload as Short", on: false },
            { label: "Made for Kids", on: false },
        ],
    },
    {
        name: "TikTok", charLimit: 150, imageRatio: "9:16", maxImages: 1,
        connected: false, followers: "—", handle: "@debanjan_tt",
        warnings: ["9:16 vertical video required", "Caption limit: 150 chars"],
        settings: [
            { label: "Duet allowed", on: true },
            { label: "Stitch allowed", on: true },
        ],
    },
    {
        name: "Pinterest", charLimit: 500, imageRatio: "2:3", maxImages: 5,
        connected: false, followers: "—", handle: "@debanjan_pins",
        warnings: ["Best ratio: 2:3 (1000×1500 px)"],
        settings: [{ label: "Secret pin", on: false }],
    },
]

export const DEFAULT_SELECTED = new Set<string>(["Instagram", "LinkedIn", "Twitter/X"])

export const TAG_SUGGESTIONS = [
    "marketing", "socialmedia", "content", "growth", "branding",
    "digital", "creator", "AI", "SaaS", "productivity",
]

export const RECENT_LOCATIONS = [
    "San Francisco, CA", "New York, NY", "London, UK", "Bangalore, India",
]
