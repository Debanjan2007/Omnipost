"use client"

import { useState } from "react"

interface PanelProps {
    onChange: () => void
}

export function PublishingPanel({ onChange }: PanelProps) {
    const [autosave, setAutosave] = useState(true)
    const [compression, setCompression] = useState(true)
    const [crosspost, setCrosspost] = useState(false)
    const [hashtags, setHashtags] = useState("#omnipost #marketing")
    const [cta, setCta] = useState("Learn more at omnipost.io")

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            <div>
                <h3 className="text-sm font-bold text-foreground">Publishing Preferences</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Define default fields, compression rules, and auto-scheduling behaviors.</p>
            </div>
            <div className="h-px bg-border/40" />

            <div className="space-y-4.5 text-xs">
                {/* Default Visibility */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Default Post Visibility</label>
                    <select className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none max-w-md">
                        <option value="public">Public (Anyone can view)</option>
                        <option value="followers">Followers Only</option>
                        <option value="private">Private Draft</option>
                    </select>
                </div>

                {/* Hashtags */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Default Hashtags suffix</label>
                    <input
                        type="text"
                        value={hashtags}
                        onChange={(e) => { setHashtags(e.target.value); onChange() }}
                        className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium max-w-md"
                    />
                </div>

                {/* Default CTA */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Default Call-To-Action (CTA) link</label>
                    <input
                        type="text"
                        value={cta}
                        onChange={(e) => { setCta(e.target.value); onChange() }}
                        className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium max-w-md"
                    />
                </div>

                <div className="h-px bg-border/40 my-3" />

                {/* Toggles */}
                <div className="space-y-3.5 max-w-md">
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                        <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">Auto-save drafts</p>
                            <p className="text-[10px] text-muted-foreground">Instantly back up your post drafts to cloud storage as you type.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setAutosave(!autosave); onChange() }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${autosave ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${autosave && "translate-x-3.5"}`} />
                        </button>
                    </label>

                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                        <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">Media Auto-Compression</p>
                            <p className="text-[10px] text-muted-foreground">Automatically compress large images/videos to match platform recommendations.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setCompression(!compression); onChange() }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${compression ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${compression && "translate-x-3.5"}`} />
                        </button>
                    </label>

                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                        <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">Enable Cross-posting warnings</p>
                            <p className="text-[10px] text-muted-foreground">Prompt warnings when copying formatting across Twitter/LinkedIn.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setCrosspost(!crosspost); onChange() }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${crosspost ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${crosspost && "translate-x-3.5"}`} />
                        </button>
                    </label>
                </div>
            </div>

            <div className="pt-2 flex justify-end">
                <button type="submit" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all">
                    Save Preferences
                </button>
            </div>
        </div>
    )
}
