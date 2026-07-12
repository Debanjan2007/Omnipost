import {
    User, Building, Sliders, Share2, Sparkles, Bell,
    Palette, Shield, KeyRound, Blocks, CreditCard, Flame
} from "lucide-react"

export type SettingsTab =
    | "profile"
    | "workspace"
    | "publishing"
    | "accounts"
    | "ai"
    | "notifications"
    | "appearance"
    | "security"
    | "api"
    | "integrations"
    | "billing"
    | "advanced"

export interface NavItem {
    id: SettingsTab
    label: string
    iconName: React.ComponentType<{ size?: number; className?: string }>
}

export const SETTINGS_NAV_ITEMS: NavItem[] = [
    { id: "profile", label: "Profile", iconName: User },
    { id: "workspace", label: "Workspace", iconName: Building },
    { id: "publishing", label: "Publishing Preferences", iconName: Sliders },
    { id: "accounts", label: "Connected Accounts", iconName: Share2 },
    { id: "ai", label: "AI Preferences", iconName: Sparkles },
    { id: "notifications", label: "Notifications", iconName: Bell },
    { id: "appearance", label: "Appearance", iconName: Palette },
    { id: "security", label: "Security", iconName: Shield },
    { id: "api", label: "API Keys", iconName: KeyRound },
    { id: "integrations", label: "Integrations", iconName: Blocks },
    { id: "billing", label: "Billing & Plans", iconName: CreditCard },
    { id: "advanced", label: "Advanced Settings", iconName: Flame },
]

export const MOCK_PROFILE = {
    displayName: "Debanjan Dey",
    username: "debanjan_dev",
    email: "debanjan@omnipost.io",
    bio: "Software Engineer & Creator. Building OmniPost to unify social media distribution.",
    timezone: "Asia/Kolkata",
    language: "en-US",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debanjan&backgroundColor=b6e3f4"
}

export const MOCK_WORKSPACE = {
    name: "OmniPost Staging",
    logoUrl: "",
    defaultTimezone: "Asia/Kolkata",
    defaultLanguage: "en-US",
}

export const MOCK_API_KEYS = [
    { id: "key-1", name: "Production Analytics token", token: "op_live_3829...fd48", created: "Jan 12, 2026", status: "Active" },
    { id: "key-2", name: "Staging local build token", token: "op_test_9013...983a", created: "Feb 04, 2026", status: "Active" }
]

export const MOCK_INTEGRATIONS = [
    { id: "int-1", name: "Slack", desc: "Push publishing notifications and warning alerts to Slack channels.", connected: true, logo: "💬" },
    { id: "int-2", name: "Google Drive", desc: "Import media files, documents, and videos directly into the composer.", connected: true, logo: "📁" },
    { id: "int-3", name: "Zapier", desc: "Automate scheduling workflows using webhook triggers.", connected: false, logo: "⚡" },
    { id: "int-4", name: "Google Calendar", desc: "Sync published dates and schedules automatically with Google Calendar.", connected: false, logo: "📅" }
]

export const MOCK_BILLING = {
    plan: "Growth Pro Creator",
    price: "$49 / month",
    billingCycle: "Renews on August 10, 2026",
    usage: {
        posts: { current: 142, limit: 500, label: "Posts published this month" },
        accounts: { current: 5, limit: 10, label: "Connected social accounts" },
        aiWords: { current: 12400, limit: 50000, label: "AI credits used" }
    },
    invoices: [
        { date: "Jul 10, 2026", id: "INV-09823", amount: "$49.00", status: "Paid" },
        { date: "Jun 10, 2026", id: "INV-08472", amount: "$49.00", status: "Paid" }
    ]
}
