// ─────────────────────────────────────────────────────────────────────────────
// Static content + types for the Create Post experience.
// All copy is realistic placeholder content — no lorem ipsum, no external URLs
// for media (thumbnails are gradient swatches rendered in-app).
// ─────────────────────────────────────────────────────────────────────────────

// ─── Platforms ──────────────────────────────────────────────────────────────

export type PlatformId =
    | "instagram" | "facebook" | "linkedin" | "x"
    | "threads"   | "bluesky"  | "youtube"  | "tiktok" | "pinterest"

export interface PlatformMeta {
    id:        PlatformId
    name:      string
    handle:    string
    connected: boolean
    /** Hard character limit for the caption/body on this platform. */
    limit:     number
    /** One-line platform-specific setting hint shown on the card. */
    setting:   string
}

export const PLATFORMS: PlatformMeta[] = [
    { id: "instagram", name: "Instagram", handle: "@omnipost.hq",   connected: true,  limit: 2200,  setting: "Feed + Story" },
    { id: "facebook",  name: "Facebook",  handle: "OmniPost",       connected: true,  limit: 63206, setting: "Page timeline" },
    { id: "linkedin",  name: "LinkedIn",  handle: "OmniPost Inc.",  connected: true,  limit: 3000,  setting: "Company page" },
    { id: "x",         name: "X",         handle: "@omnipost",      connected: true,  limit: 280,   setting: "Single post" },
    { id: "threads",   name: "Threads",   handle: "@omnipost.hq",   connected: true,  limit: 500,   setting: "New thread" },
    { id: "bluesky",   name: "Bluesky",   handle: "@omnipost.bsky", connected: false, limit: 300,   setting: "Connect to enable" },
    { id: "youtube",   name: "YouTube",   handle: "OmniPost",       connected: true,  limit: 5000,  setting: "Community post" },
    { id: "tiktok",    name: "TikTok",    handle: "@omnipost",      connected: false, limit: 2200,  setting: "Connect to enable" },
    { id: "pinterest", name: "Pinterest", handle: "OmniPost",       connected: true,  limit: 500,   setting: "New pin" },
]

/** Platforms enabled by default when the composer opens. */
export const DEFAULT_ENABLED: PlatformId[] = ["instagram", "linkedin", "x"]

/** Platforms that get a rendered device preview at the bottom of the page. */
export const PREVIEW_PLATFORMS: PlatformId[] = [
    "instagram", "facebook", "linkedin", "x", "threads", "youtube",
]

// ─── Media ────────────────────────────────────────────────────────────────────

export type MediaType = "image" | "video" | "gif" | "document"

export interface MediaItem {
    id:     string
    type:   MediaType
    name:   string
    /** CSS gradient used as a stand-in thumbnail (no external assets). */
    swatch: string
    alt:    string
    /** Human aspect-ratio label, e.g. "4:5". */
    ratio:  string
}

export const SEED_MEDIA: MediaItem[] = [
    {
        id: "m1", type: "image", name: "hero-launch.png", ratio: "4:5",
        swatch: "linear-gradient(135deg,#8467D7 0%,#5D3FD3 100%)",
        alt: "Product hero — OmniPost dashboard on a gradient backdrop",
    },
    {
        id: "m2", type: "image", name: "team-workspace.jpg", ratio: "1:1",
        swatch: "linear-gradient(135deg,#F58529 0%,#DD2A7B 60%,#8134AF 100%)",
        alt: "Team collaborating around a shared content calendar",
    },
    {
        id: "m3", type: "video", name: "feature-teaser.mp4", ratio: "16:9",
        swatch: "linear-gradient(135deg,#00897B 0%,#3F51B5 100%)",
        alt: "15-second teaser of the new scheduling flow",
    },
]

export const ACCEPTED_FORMATS = "PNG, JPG, GIF, MP4, MOV, PDF · up to 512 MB"

// ─── Link preview ───────────────────────────────────────────────────────────

export const LINK_PREVIEW = {
    url:         "https://omnipost.io/playbook/multi-platform-2026",
    domain:      "omnipost.io",
    title:       "The Multi-Platform Publishing Playbook for 2026",
    description: "Nine channels, one workflow. See how modern teams plan, schedule, and measure content without ever switching tabs.",
    swatch:      "linear-gradient(120deg,#5D3FD3 0%,#9D8DF2 100%)",
}

// ─── Poll ─────────────────────────────────────────────────────────────────────

export const POLL_DEFAULT = {
    question: "Which OmniPost feature should we ship next?",
    options:  ["Bulk scheduling", "AI reply drafts", "Team approvals"],
    duration: "1 day",
}

export const POLL_DURATIONS = ["6 hours", "1 day", "3 days", "1 week"]

// ─── Location + tags ───────────────────────────────────────────────────────────

export const RECENT_LOCATIONS = [
    "San Francisco, CA",
    "New York, NY",
    "London, UK",
    "Remote · Worldwide",
]

export const DEFAULT_TAGS = ["productlaunch", "omnipost"]

export const TAG_SUGGESTIONS = [
    "socialmedia", "contentmarketing", "saas", "creators",
    "growthtips", "automation", "productivity", "marketing",
]

// ─── Scheduling ─────────────────────────────────────────────────────────────

export const TIMEZONES = [
    "(GMT-08:00) Pacific Time",
    "(GMT-05:00) Eastern Time",
    "(GMT+00:00) London",
    "(GMT+01:00) Central Europe",
    "(GMT+05:30) India Standard Time",
    "(GMT+09:00) Tokyo",
]

export const REPEAT_OPTIONS = [
    "Does not repeat", "Daily", "Weekdays", "Weekly", "Monthly",
]

export const BEST_TIME = {
    label: "Tue · 1:30 PM",
    reason: "Peak engagement window for your audience across the selected platforms.",
}

// ─── Audience ───────────────────────────────────────────────────────────────

export type AudienceId = "public" | "followers" | "private" | "custom"

export const AUDIENCE_OPTIONS: { id: AudienceId; label: string; desc: string }[] = [
    { id: "public",    label: "Public",    desc: "Anyone can see this post" },
    { id: "followers", label: "Followers", desc: "Only people who follow you" },
    { id: "private",   label: "Private",   desc: "Only you and invited members" },
    { id: "custom",    label: "Custom",    desc: "Pick lists and segments" },
]

// ─── AI assistant ───────────────────────────────────────────────────────────

export type AiActionKey =
    | "improve" | "shorten" | "expand" | "professional" | "funny"
    | "caption" | "hashtags" | "cta" | "emoji"

export const AI_ACTIONS: { key: AiActionKey; label: string }[] = [
    { key: "improve",      label: "Improve Writing" },
    { key: "shorten",      label: "Shorten" },
    { key: "expand",       label: "Expand" },
    { key: "professional", label: "Professional Tone" },
    { key: "funny",        label: "Funny Tone" },
    { key: "caption",      label: "Generate Caption" },
    { key: "hashtags",     label: "Generate Hashtags" },
    { key: "cta",          label: "Generate CTA" },
    { key: "emoji",        label: "Emoji Version" },
]

export const AI_EXAMPLE_PROMPTS = [
    "Announce our summer feature drop with an upbeat, benefit-led hook",
    "Turn this update into a LinkedIn thought-leadership post",
    "Write three punchy variations under 280 characters for X",
]

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const SEO_DEFAULTS = {
    metaTitle:   "OmniPost — Publish everywhere from one place",
    description: "Plan, schedule, and measure content across nine platforms without switching tabs.",
    slug:        "multi-platform-2026",
    ogImage:     "hero-launch.png",
}

// ─── Reading-time helpers ──────────────────────────────────────────────────────

export function wordCount(text: string): number {
    const t = text.trim()
    return t ? t.split(/\s+/).length : 0
}

/** Rounded reading time in seconds, assuming ~200 wpm. */
export function readingSeconds(text: string): number {
    return Math.round((wordCount(text) / 200) * 60)
}
