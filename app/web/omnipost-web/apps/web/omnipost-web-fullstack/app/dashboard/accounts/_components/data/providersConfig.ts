import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"

export interface ProviderConfig {
    key: string
    name: string
    enabled: boolean
    oauthPath?: string
    desc: string
    features: string[]
    // Standard signature: (props: { size?: number; className?: string }) => React.ReactNode
    icon: (props: { size?: number; className?: string }) => React.ReactNode
}

export const PROVIDERS_CONFIG: Record<string, ProviderConfig> = {
    linkedin: {
        key: "linkedin",
        name: "LinkedIn",
        enabled: true,
        oauthPath: "/dashboard/oauth/linkedin",
        desc: "Post updates to personal profile or company pages",
        features: ["Rich text articles", "Document attachments", "Organization Sync"],
        icon: (props) => PlatformIcon({ name: "LinkedIn", ...props })
    },
    twitter: {
        key: "twitter",
        name: "Twitter/X",
        enabled: false,
        desc: "Post tweets, threads, and upload short videos",
        features: ["280-char Tweets", "Threads", "Direct Media Upload"],
        icon: (props) => PlatformIcon({ name: "Twitter/X", ...props })
    },
    instagram: {
        key: "instagram",
        name: "Instagram",
        enabled: false,
        desc: "Share photo posts, carousel feeds, and direct Reels",
        features: ["Media Upload", "Auto First Comment", "Analytics"],
        icon: (props) => PlatformIcon({ name: "Instagram", ...props })
    },
    facebook: {
        key: "facebook",
        name: "Facebook",
        enabled: false,
        desc: "Publish to Business pages and interact with followers",
        features: ["Post Publishing", "Page Feed", "Direct Messaging"],
        icon: (props) => PlatformIcon({ name: "Facebook", ...props })
    },
    youtube: {
        key: "youtube",
        name: "YouTube",
        enabled: false,
        desc: "Upload high-quality videos, Shorts, and customize thumbnails",
        features: ["Video Upload", "Shorts categorization", "Analytics"],
        icon: (props) => PlatformIcon({ name: "YouTube", ...props })
    }
}
export type ProviderKey = keyof typeof PROVIDERS_CONFIG
