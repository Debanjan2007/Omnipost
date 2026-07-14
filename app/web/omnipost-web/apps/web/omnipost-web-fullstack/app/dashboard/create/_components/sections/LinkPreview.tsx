"use client"

import { useState } from "react"
import { Link2, RefreshCw, Edit3, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Mock preview data ────────────────────────────────────────────────────────
// In production this would call an Open Graph scraping API.

const MOCK_PREVIEW = {
    title:       "OmniPost — Publish Everywhere at Once",
    description: "The all-in-one social media management platform for creators and teams. Schedule, analyze, and grow across all platforms.",
    domain:      "omnipost.io",
    image:       "https://placehold.co/600x315/6366f1/ffffff?text=Link+Preview",
}

interface LinkPreviewProps {
    url: string
}

/**
 * LinkPreview — shows an Open Graph preview card when a URL is detected.
 * Allows editing metadata inline and refreshing the scrape.
 */
export function LinkPreview({ url }: LinkPreviewProps) {
    const [editing, setEditing] = useState(false)
    const [title,   setTitle]   = useState(MOCK_PREVIEW.title)
    const [desc,    setDesc]    = useState(MOCK_PREVIEW.description)
    const [loading, setLoading] = useState(false)

    function refresh() {
        setLoading(true)
        setTimeout(() => setLoading(false), 1200)
    }

    if (!url) return null

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Link2 size={14} className="text-muted-foreground"/>
                    Link Preview
                </h3>
                <div className="flex items-center gap-1.5">
                    <button onClick={refresh} disabled={loading}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <RefreshCw size={12} className={cn(loading && "animate-spin")}/>
                    </button>
                    <button onClick={() => setEditing(!editing)}
                        className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                            editing
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground",
                        )}>
                        <Edit3 size={12}/>
                    </button>
                </div>
            </div>

            {/* Preview card */}
            <div className="p-4">
                <div className={cn(
                    "border border-border rounded-xl overflow-hidden transition-all",
                    loading && "opacity-50",
                )}>
                    {/* OG Image */}
                    <div className="aspect-[1.91/1] bg-muted flex items-center justify-center text-muted-foreground/30 text-xs">
                        <img src={MOCK_PREVIEW.image} alt={title} className="w-full h-full object-cover"/>
                    </div>

                    {/* Text content */}
                    <div className="p-3 space-y-1.5">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                            {MOCK_PREVIEW.domain}
                        </p>
                        {editing ? (
                            <>
                                <input value={title} onChange={e => setTitle(e.target.value)}
                                    className="w-full text-sm font-semibold text-foreground bg-muted/50 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30"/>
                                <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2}
                                    className="w-full text-xs text-muted-foreground bg-muted/50 rounded-lg px-2 py-1 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"/>
                                <div className="flex justify-end gap-1.5 pt-1">
                                    <button onClick={() => setEditing(false)}
                                        className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-primary text-primary-foreground font-medium">
                                        <Check size={10}/> Save
                                    </button>
                                    <button onClick={() => setEditing(false)}
                                        className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-border text-muted-foreground">
                                        <X size={10}/> Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-semibold text-foreground leading-snug">{title}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{desc}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
