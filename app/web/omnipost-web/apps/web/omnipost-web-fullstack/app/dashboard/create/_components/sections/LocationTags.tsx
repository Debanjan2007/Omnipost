"use client"

import { useState } from "react"
import { MapPin, Tag, X, Plus } from "lucide-react"
import { TAG_SUGGESTIONS, RECENT_LOCATIONS } from "../data/platforms"
import { cn } from "@/lib/utils"

interface LocationTagsProps {
    location:    string
    setLocation: (l: string) => void
    tags:        string[]
    setTags:     (t: string[]) => void
}

/**
 * LocationTags — location search with recent suggestions + tag chip input.
 */
export function LocationTags({ location, setLocation, tags, setTags }: LocationTagsProps) {
    const [tagInput, setTagInput] = useState("")

    function addTag(tag: string) {
        const clean = tag.trim().toLowerCase().replace(/^#/, "")
        if (!clean || tags.includes(clean)) return
        setTags([...tags, clean])
        setTagInput("")
    }
    function removeTag(tag: string) { setTags(tags.filter(t => t !== tag)) }

    function onTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput) }
        if (e.key === "Backspace" && !tagInput && tags.length) removeTag(tags[tags.length - 1])
    }

    const suggestions = TAG_SUGGESTIONS.filter(s => !tags.includes(s))

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {/* Location */}
            <div className="px-4 py-3 border-b border-border/60">
                <div className="flex items-center gap-2 mb-2.5">
                    <MapPin size={14} className="text-muted-foreground"/>
                    <span className="text-sm font-semibold text-foreground">Location</span>
                </div>
                <input
                    type="text"
                    placeholder="Search location…"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full h-8 px-3 rounded-lg bg-muted/50 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {/* Recent */}
                {!location && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {RECENT_LOCATIONS.map(loc => (
                            <button key={loc} onClick={() => setLocation(loc)}
                                className="text-[11px] px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors">
                                {loc}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Tags */}
            <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-2.5">
                    <Tag size={14} className="text-muted-foreground"/>
                    <span className="text-sm font-semibold text-foreground">Tags</span>
                </div>

                {/* Tag chip input */}
                <div className="min-h-[36px] flex flex-wrap gap-1.5 items-center px-2 py-1.5 rounded-xl bg-muted/50 border border-border/60 focus-within:ring-2 focus-within:ring-primary/30">
                    {tags.map(t => (
                        <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            #{t}
                            <button onClick={() => removeTag(t)}><X size={10}/></button>
                        </span>
                    ))}
                    <input
                        type="text"
                        placeholder={tags.length ? "" : "Add tags… (press Enter)"}
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={onTagKeyDown}
                        className="flex-1 min-w-[80px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                    />
                </div>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[10px] text-muted-foreground self-center">Suggested:</span>
                        {suggestions.slice(0, 6).map(s => (
                            <button key={s} onClick={() => addTag(s)}
                                className="flex items-center gap-0.5 text-[11px] px-2 py-0.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors">
                                <Plus size={9}/> #{s}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
