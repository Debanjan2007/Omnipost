"use client"

import { useState } from "react"
import { Globe, Upload } from "lucide-react"
import { PanelCard } from "../ui/PanelCard"

/**
 * SEOPanel — meta title, description, slug, and OG image fields.
 * Typically shown for blog/article posts and YouTube.
 */
export function SEOPanel() {
    const [metaTitle, setMetaTitle] = useState("")
    const [desc,      setDesc]      = useState("")
    const [slug,      setSlug]      = useState("")

    function toSlug(val: string) {
        return val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }

    return (
        <PanelCard title="SEO" icon={<Globe size={14}/>} defaultOpen={false}>
            <div className="px-4 py-3 space-y-3">

                {/* Meta title */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] text-muted-foreground">Meta Title</label>
                        <span className={`text-[10px] tabular-nums ${metaTitle.length > 60 ? "text-[var(--color-warning)]" : "text-muted-foreground/60"}`}>
                            {metaTitle.length}/60
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="OmniPost — Publish Everywhere"
                        value={metaTitle}
                        onChange={e => { setMetaTitle(e.target.value); if (!slug) setSlug(toSlug(e.target.value)) }}
                        className="w-full h-8 px-3 rounded-xl bg-muted/50 border border-border/60 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>

                {/* Description */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] text-muted-foreground">Description</label>
                        <span className={`text-[10px] tabular-nums ${desc.length > 160 ? "text-[var(--color-warning)]" : "text-muted-foreground/60"}`}>
                            {desc.length}/160
                        </span>
                    </div>
                    <textarea
                        rows={2}
                        placeholder="A short description for search engines…"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-muted/50 border border-border/60 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                </div>

                {/* Slug */}
                <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground">Slug</label>
                    <div className="flex items-center gap-0 border border-border/60 rounded-xl bg-muted/50 overflow-hidden focus-within:ring-2 focus-within:ring-primary/30">
                        <span className="px-2.5 text-[11px] text-muted-foreground border-r border-border/60 h-8 flex items-center">omnipost.io/</span>
                        <input type="text" value={slug} onChange={e => setSlug(toSlug(e.target.value))}
                            placeholder="your-post-slug"
                            className="flex-1 h-8 px-2 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none"/>
                    </div>
                </div>

                {/* OG Image */}
                <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground">OG Image</label>
                    <button className="w-full h-16 rounded-xl border-2 border-dashed border-border/60 hover:border-primary/40 hover:bg-muted/30 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-all text-xs font-medium">
                        <Upload size={13}/> Upload OG Image (1200×630 px)
                    </button>
                </div>
            </div>
        </PanelCard>
    )
}
