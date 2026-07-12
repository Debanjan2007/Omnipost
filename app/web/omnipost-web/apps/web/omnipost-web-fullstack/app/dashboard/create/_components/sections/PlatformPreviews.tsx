"use client"

import { useState } from "react"
import {
    Heart, MessageCircle, Send, Bookmark, Repeat2,
    ThumbsUp, Share2, MoreHorizontal, Globe, Play,
} from "lucide-react"
import { PlatformIcon } from "@/app/Components/dashboard/PlatformIcons"
import { cn } from "@/lib/utils"
import type { MediaFile } from "./MediaUpload"

// ─── Shared helpers ───────────────────────────────────────────────────────────

const AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Debanjan&backgroundColor=b6e3f4"

function Avatar({ size = 36 }: { size?: number }) {
    return (
        <div className="shrink-0 rounded-full bg-primary/20 overflow-hidden border-2 border-border/40 flex items-center justify-center"
            style={{ width: size, height: size }}>
            <span className="text-sm font-bold text-primary"
                style={{ fontSize: size * 0.38 }}>D</span>
        </div>
    )
}

function MediaPlaceholder({ file, className }: { file?: MediaFile; className?: string }) {
    if (file && (file.type === "image" || file.type === "gif")) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={file.url} alt={file.altText || "media"} className={cn("w-full object-cover", className)}/>
    }
    return (
        <div className={cn("w-full bg-muted/60 flex items-center justify-center", className)}>
            <div className="flex flex-col items-center gap-1 text-muted-foreground/30">
                <div className="w-10 h-10 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center">
                    <Play size={14}/>
                </div>
                <span className="text-[10px]">Media preview</span>
            </div>
        </div>
    )
}

function truncate(text: string, n: number) {
    return text.length <= n ? text : text.slice(0, n) + "…"
}

// ─── Platform previews ────────────────────────────────────────────────────────

function InstagramPreview({ content, file }: { content: string; file?: MediaFile }) {
    return (
        <div className="max-w-[375px] mx-auto bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                    <Avatar size={32}/>
                    <div>
                        <p className="text-[11px] font-bold text-foreground leading-none">omnipost</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">San Francisco, CA</p>
                    </div>
                </div>
                <MoreHorizontal size={16} className="text-muted-foreground"/>
            </div>
            {/* Media */}
            <MediaPlaceholder file={file} className="aspect-square"/>
            {/* Actions */}
            <div className="px-3 py-2.5 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Heart size={22} className="text-foreground hover:text-red-500 cursor-pointer transition-colors"/>
                        <MessageCircle size={22} className="text-foreground cursor-pointer"/>
                        <Send size={22} className="text-foreground cursor-pointer"/>
                    </div>
                    <Bookmark size={22} className="text-foreground cursor-pointer"/>
                </div>
                <p className="text-[11px] font-bold text-foreground">1,284 likes</p>
                <div>
                    <p className="text-[11px] text-foreground leading-relaxed">
                        <span className="font-bold">omnipost</span>{" "}
                        {content ? truncate(content, 180) : <span className="text-muted-foreground italic">Your caption will appear here…</span>}
                    </p>
                    {content && <p className="text-[10px] text-primary mt-1">#marketing #socialmedia #content</p>}
                </div>
                <p className="text-[9px] text-muted-foreground uppercase tracking-wider">2 hours ago</p>
            </div>
        </div>
    )
}

function TwitterPreview({ content }: { content: string }) {
    return (
        <div className="max-w-[375px] mx-auto bg-background border border-border rounded-2xl p-4 shadow-sm">
            <div className="flex gap-3">
                <Avatar size={40}/>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-bold text-foreground">Debanjan</p>
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[var(--color-brand-bluesky)] fill-current shrink-0">
                            <path d="M8.52 3.59A10 10 0 0122 12a10 10 0 01-13.48 9.34L8 22l-.53-3a7.5 7.5 0 01-3.62-6.64A7.48 7.48 0 018.52 3.59z" opacity=".3"/><path d="M10.12 7.5l1.88 4.03 4.35-4.87L17.5 8.5l-5.5 6-3-6.38L10.12 7.5zM8.5 5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z"/>
                        </svg>
                        <p className="text-[11px] text-muted-foreground">@debanjan_ · 2h</p>
                    </div>
                    <p className="text-sm text-foreground mt-1.5 leading-relaxed">
                        {content
                            ? truncate(content, 280)
                            : <span className="text-muted-foreground italic text-xs">Your tweet will appear here…</span>
                        }
                    </p>
                    <div className="flex items-center gap-6 mt-3 text-muted-foreground">
                        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                            <MessageCircle size={14}/><span className="text-xs">45</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-[var(--color-success)] transition-colors">
                            <Repeat2 size={14}/><span className="text-xs">128</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                            <Heart size={14}/><span className="text-xs">892</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                            <Bookmark size={14}/><span className="text-xs">56</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LinkedInPreview({ content }: { content: string }) {
    return (
        <div className="max-w-[375px] mx-auto bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <Avatar size={44}/>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground leading-tight">Debanjan</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">Software Developer · Building OmniPost</p>
                        <p className="text-[10px] text-muted-foreground">1h · <Globe size={9} className="inline -mt-0.5"/></p>
                    </div>
                    <button className="text-xs font-semibold text-primary border border-primary/50 rounded-full px-3 py-1 hover:bg-primary/5 transition-colors">
                        + Follow
                    </button>
                </div>
                <div className="mt-3">
                    <p className="text-sm text-foreground leading-relaxed">
                        {content
                            ? truncate(content, 300)
                            : <span className="text-muted-foreground italic">Your LinkedIn post will appear here…</span>
                        }
                    </p>
                    {content && <button className="text-xs text-primary font-medium mt-0.5">…see more</button>}
                </div>
            </div>
            <div className="px-4 py-2 border-t border-border/60 space-y-2">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span>👍</span><span>❤️</span><span>💡</span>
                    <span className="ml-1">142 reactions · 28 comments</span>
                </div>
                <div className="flex items-center justify-around pt-1">
                    {[["👍","Like"],["💬","Comment"],["🔄","Repost"],["✈️","Send"]].map(([ico,label]) => (
                        <button key={label} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted">
                            <span>{ico}</span> {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function FacebookPreview({ content, file }: { content: string; file?: MediaFile }) {
    return (
        <div className="max-w-[375px] mx-auto bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                    <Avatar size={36}/>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">Debanjan</p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">2h · <Globe size={9}/></p>
                    </div>
                    <MoreHorizontal size={16} className="text-muted-foreground"/>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                    {content
                        ? truncate(content, 300)
                        : <span className="text-muted-foreground italic">Your Facebook post will appear here…</span>
                    }
                </p>
            </div>
            {file && <MediaPlaceholder file={file} className="aspect-[1.91/1]"/>}
            <div className="px-4 py-2.5 border-t border-border/60 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>👍 ❤️ 😄  78 reactions</span>
                    <span>12 comments · 5 shares</span>
                </div>
                <div className="flex items-center justify-around border-t border-border/60 pt-2">
                    {[["👍","Like"],["💬","Comment"],["↗️","Share"]].map(([ico,label]) => (
                        <button key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted">
                            <span>{ico}</span> {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ThreadsPreview({ content }: { content: string }) {
    return (
        <div className="max-w-[375px] mx-auto bg-background border border-border rounded-2xl p-4 shadow-sm">
            <div className="flex gap-3">
                <Avatar size={36}/>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-foreground">debanjan_</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-[11px]">1h</span>
                            <MoreHorizontal size={15}/>
                        </div>
                    </div>
                    <p className="text-sm text-foreground mt-1.5 leading-relaxed">
                        {content
                            ? truncate(content, 500)
                            : <span className="text-muted-foreground italic text-xs">Your Threads post will appear here…</span>
                        }
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors"><Heart size={16}/></button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors"><MessageCircle size={16}/></button>
                        <button className="flex items-center gap-1 hover:text-[var(--color-success)] transition-colors"><Repeat2 size={16}/></button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors"><Send size={16}/></button>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">234 likes</p>
                </div>
            </div>
        </div>
    )
}

function YouTubePreview({ content, file }: { content: string; file?: MediaFile }) {
    return (
        <div className="max-w-[375px] mx-auto bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
            <MediaPlaceholder file={file} className="aspect-video"/>
            <div className="p-4 space-y-2.5">
                <p className="text-sm font-semibold text-foreground leading-snug">
                    {content ? truncate(content, 100) : <span className="text-muted-foreground italic">Your video title will appear here…</span>}
                </p>
                <div className="flex items-center gap-2">
                    <Avatar size={28}/>
                    <div>
                        <p className="text-[11px] font-medium text-foreground">OmniPost Channel</p>
                        <p className="text-[10px] text-muted-foreground">2.4K subscribers</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <button className="flex items-center gap-1.5 text-xs hover:text-foreground transition-colors">
                        <ThumbsUp size={14}/> 1.2K
                    </button>
                    <button className="flex items-center gap-1.5 text-xs hover:text-foreground transition-colors">
                        <MessageCircle size={14}/> 48
                    </button>
                    <button className="flex items-center gap-1.5 text-xs hover:text-foreground transition-colors">
                        <Share2 size={14}/> Share
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Tab configuration ────────────────────────────────────────────────────────

const PREVIEW_TABS = [
    "Instagram", "Twitter/X", "LinkedIn", "Facebook", "Threads", "YouTube",
] as const
type PreviewTab = typeof PREVIEW_TABS[number]

// ─── Main component ───────────────────────────────────────────────────────────

interface PlatformPreviewsProps {
    content:  string
    files:    MediaFile[]
    selected: Set<string>
}

/**
 * PlatformPreviews — tab-switching authentic platform previews.
 * Shows only platforms that are selected. Falls back to a placeholder.
 */
export function PlatformPreviews({ content, files, selected }: PlatformPreviewsProps) {
    const availableTabs = PREVIEW_TABS.filter(t => selected.has(t))
    const [activeTab, setActiveTab] = useState<PreviewTab>(availableTabs[0] ?? "Instagram")

    const firstImage = files.find(f => f.type === "image" || f.type === "gif")

    function renderPreview() {
        switch (activeTab) {
            case "Instagram":  return <InstagramPreview content={content} file={firstImage}/>
            case "Twitter/X":  return <TwitterPreview   content={content}/>
            case "LinkedIn":   return <LinkedInPreview  content={content}/>
            case "Facebook":   return <FacebookPreview  content={content} file={firstImage}/>
            case "Threads":    return <ThreadsPreview   content={content}/>
            case "YouTube":    return <YouTubePreview   content={content} file={firstImage}/>
            default:           return null
        }
    }

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/60">
                <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">See exactly how your post will look</p>
            </div>

            {/* Tab bar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-border/60 overflow-x-auto">
                {PREVIEW_TABS.map(tab => {
                    const isEnabled = selected.has(tab)
                    const isActive  = activeTab === tab
                    return (
                        <button
                            key={tab}
                            type="button"
                            disabled={!isEnabled}
                            onClick={() => { if (isEnabled) setActiveTab(tab) }}
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                                isActive  && isEnabled  ? "bg-primary/10 text-primary"
                              : isEnabled              ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                              :                          "text-muted-foreground/30 cursor-not-allowed",
                            )}
                        >
                            <PlatformIcon name={tab} size={16} className="rounded-md"/>
                            {tab}
                        </button>
                    )
                })}
            </div>

            {/* Preview area */}
            <div className="p-4 sm:p-6 bg-muted/20">
                {availableTabs.includes(activeTab) ? (
                    renderPreview()
                ) : (
                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                        <PlatformIcon name={activeTab} size={40}/>
                        <p className="text-xs text-muted-foreground">Enable <span className="font-medium text-foreground">{activeTab}</span> in Platforms to see a preview.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
