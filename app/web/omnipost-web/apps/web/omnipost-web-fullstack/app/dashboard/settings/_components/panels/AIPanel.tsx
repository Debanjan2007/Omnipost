"use client"

import { useState } from "react"
import { Sliders } from "lucide-react"

interface PanelProps {
    onChange: () => void
}

export function AIPanel({ onChange }: PanelProps) {
    const [tone, setTone] = useState("professional")
    const [model, setModel] = useState("gemini-1.5-pro")
    const [creativity, setCreativity] = useState(0.7)
    
    // Toggles
    const [genHashtags, setGenHashtags] = useState(true)
    const [genEmojis, setGenEmojis] = useState(true)
    const [genAltText, setGenAltText] = useState(false)
    const [suggestTime, setSuggestTime] = useState(true)

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            <div>
                <h3 className="text-sm font-bold text-foreground">AI Content Preferences</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Customize default settings for writing tones, models, and assistant templates.</p>
            </div>
            <div className="h-px bg-border/40" />

            <div className="space-y-4.5 text-xs">
                {/* Preferred Tone */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Default Writing Tone</label>
                    <select
                        value={tone}
                        onChange={(e) => { setTone(e.target.value); onChange() }}
                        className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none max-w-md"
                    >
                        <option value="professional">💼 Professional (Corporate, Informative)</option>
                        <option value="casual">😊 Casual (Friendly, Conversational)</option>
                        <option value="marketing">🚀 Marketing (High conversion, Engaging)</option>
                        <option value="funny">😄 Funny (Humorous, Witty)</option>
                    </select>
                </div>

                {/* Default AI Model */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Default LLM Engine</label>
                    <select
                        value={model}
                        onChange={(e) => { setModel(e.target.value); onChange() }}
                        className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none max-w-md"
                    >
                        <option value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended)</option>
                        <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                        <option value="claude-3-sonnet">Claude 3 Sonnet (Creative)</option>
                    </select>
                </div>

                {/* Creativity Slider */}
                <div className="space-y-1.5 max-w-md">
                    <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-muted-foreground flex items-center gap-1">
                            <Sliders size={11} /> Creativity Temperature
                        </span>
                        <span className="font-bold text-foreground">{creativity}</span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        value={creativity}
                        onChange={(e) => { setCreativity(parseFloat(e.target.value)); onChange() }}
                        className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                    />
                </div>

                <div className="h-px bg-border/40 my-3" />

                {/* Toggles */}
                <div className="space-y-3.5 max-w-md">
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                        <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">Auto-generate hashtags</p>
                            <p className="text-[10px] text-muted-foreground">Let AI append relevant hashtags automatically based on body contents.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setGenHashtags(!genHashtags); onChange() }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${genHashtags ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${genHashtags && "translate-x-3.5"}`} />
                        </button>
                    </label>

                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                        <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">Auto-generate alt text description</p>
                            <p className="text-[10px] text-muted-foreground">Scrape uploaded images using Vision APIs and append accessibility captions.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setGenAltText(!genAltText); onChange() }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${genAltText ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${genAltText && "translate-x-3.5"}`} />
                        </button>
                    </label>

                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                        <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">Suggest optimal publishing times</p>
                            <p className="text-[10px] text-muted-foreground">Let AI evaluate past engagements and suggest the best hour of day to launch.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setSuggestTime(!suggestTime); onChange() }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${suggestTime ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${suggestTime && "translate-x-3.5"}`} />
                        </button>
                    </label>
                </div>
            </div>

            <div className="pt-2 flex justify-end">
                <button type="submit" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all">
                    Save AI Settings
                </button>
            </div>
        </div>
    )
}
