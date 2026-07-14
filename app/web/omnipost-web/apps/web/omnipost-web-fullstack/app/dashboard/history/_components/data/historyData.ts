export interface Engagement {
    likes: number
    comments: number
    shares: number
    views?: number
    reach?: number
}

export type PostStatus = "Published" | "Scheduled" | "Failed" | "Draft" | "Processing" | "Deleted"
export type ContentType = "image" | "video" | "carousel" | "text"

export interface HistoryEvent {
    id: string
    platform: "Instagram" | "Facebook" | "LinkedIn" | "Twitter/X" | "Threads" | "Bluesky" | "YouTube" | "TikTok" | "Pinterest" | "Mastodon"
    status: PostStatus
    contentType: ContentType
    title: string
    caption: string
    thumbnailUrl?: string
    timestamp: string // Display time
    destination: string
    author: string
    engagement?: Engagement
    createdTime: string
    scheduledTime?: string
    publishedTime?: string
    webhookStatus: "active" | "inactive" | "failed"
    apiResponse?: string
    publishingDuration?: string
    errorLog?: string
}

export const MOCK_HISTORY_EVENTS: HistoryEvent[] = [
    {
        id: "ev-1",
        platform: "Instagram",
        status: "Published",
        contentType: "carousel",
        title: "OmniPost Beta Feature Showcase",
        caption: "We are thrilled to launch the new Carousel order manager. Drag, drop, scale, crop, and configure everything in one unified dashboard. Here is how our alpha testing team built their creator workflow.",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60",
        timestamp: "Today, 10:45 AM",
        destination: "Instagram @omnipost_hub",
        author: "Debanjan Dey",
        createdTime: "Today, 08:00 AM",
        publishedTime: "Today, 10:45 AM",
        webhookStatus: "active",
        publishingDuration: "4.2 seconds",
        apiResponse: '{"status": 200, "message": "Media upload success", "ig_media_id": "180324891"}',
        engagement: {
            likes: 1240,
            comments: 48,
            shares: 112,
            reach: 8400
        }
    },
    {
        id: "ev-2",
        platform: "LinkedIn",
        status: "Published",
        contentType: "image",
        title: "Building Microservices in NextJS Apps",
        caption: "A comprehensive look at optimizing server actions and loading templates for complex dashboard components without layouts shifts.",
        thumbnailUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=60",
        timestamp: "Today, 09:30 AM",
        destination: "LinkedIn in/debanjan-dey",
        author: "Debanjan Dey",
        createdTime: "Yesterday, 06:12 PM",
        publishedTime: "Today, 09:30 AM",
        webhookStatus: "active",
        publishingDuration: "3.8 seconds",
        apiResponse: '{"status": 201, "linkedin_urn": "urn:li:share:9832714"}',
        engagement: {
            likes: 342,
            comments: 18,
            shares: 24,
            views: 4800
        }
    },
    {
        id: "ev-3",
        platform: "Twitter/X",
        status: "Failed",
        contentType: "text",
        title: "API Limit Exception Thread",
        caption: "Our final staging deploy is going live today. Follow this thread for a breakdown of features, tech stack optimizations, and performance benchmark stats.",
        timestamp: "Today, 09:15 AM",
        destination: "Twitter/X @debanjan_x",
        author: "Debanjan Dey",
        createdTime: "Today, 09:00 AM",
        webhookStatus: "failed",
        errorLog: "Twitter API Limit Exceeded: Rate limit for POST /2/tweets has been reached for this token. Resets in 12 minutes.",
        apiResponse: '{"error": "rate_limit_exceeded", "code": 429, "reset_timestamp": 1783699800}'
    },
    {
        id: "ev-4",
        platform: "YouTube",
        status: "Scheduled",
        contentType: "video",
        title: "OmniPost Core Layout Walkthrough",
        caption: "An in-depth video guide demonstrating nested layout templates, route authorization guards, and custom popover controls inside our social suite dashboard.",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60",
        timestamp: "Tomorrow, 06:00 PM",
        destination: "YouTube channel/omnipost_dev",
        author: "Debanjan Dey",
        createdTime: "Yesterday, 04:00 PM",
        scheduledTime: "Tomorrow, 06:00 PM",
        webhookStatus: "active"
    },
    {
        id: "ev-5",
        platform: "Threads",
        status: "Draft",
        contentType: "text",
        title: "Meta Threads Marketing Strategy",
        caption: "Cross-platform reach analytics are finally ready to deploy. What feature do you guys want to see next on our dashboard UI?",
        timestamp: "Last edited Yesterday",
        destination: "Threads @debanjan",
        author: "Debanjan Dey",
        createdTime: "3 days ago",
        webhookStatus: "inactive"
    },
    {
        id: "ev-6",
        platform: "Facebook",
        status: "Processing",
        contentType: "image",
        title: "Staging Beta Feedback",
        caption: "We are monitoring stage server logs to ensure API keys are secure. Drop your feature requests below!",
        thumbnailUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60",
        timestamp: "Processing...",
        destination: "Facebook OmniPost Page",
        author: "Debanjan Dey",
        createdTime: "Today, 11:00 AM",
        webhookStatus: "active"
    },
    {
        id: "ev-7",
        platform: "Pinterest",
        status: "Deleted",
        contentType: "image",
        title: "UI Inspiration Guidelines Board",
        caption: "A collection of beautiful dashboards, minimal SaaS panels, sleek dark mode variables, and rounded cards designs.",
        thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60",
        timestamp: "Deleted 2 days ago",
        destination: "Pinterest /inspiration",
        author: "Debanjan Dey",
        createdTime: "5 days ago",
        webhookStatus: "inactive"
    }
]
