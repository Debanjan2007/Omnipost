"use client"

import { useState } from "react"
import { Sparkles, Loader2, Wand2 } from "lucide-react"
import { PanelCard } from "../ui/PanelCard"
import { cn } from "@/lib/utils"

const QUICK_ACTIONS = [
    { label: "Improve Writing",    emoji: "✨" },
    { label: "Make Shorter",       emoji: "✂️" },
    { label: "Expand",             emoji: "📖" },
    { label: "Professional Tone",  emoji: "💼" },
    { label: "Funny Tone",         emoji: "😄" },
    { label: "Generate Caption",   emoji: "💬" },
    { label: "Generate Hashtags",  emoji: "#️⃣" },
    { label: "Generate CTA",       emoji: "👆" },
    { label: "Emoji Version",      emoji: "🎨" },
    { label: "Thread Format",      emoji: "🧵" },
]

interface AIPanelProps {
    content:    string
    setContent: (c: string) => void
}

export function AIPanel({ content, setContent }: AIPanelProps) {
    const [prompt,   setPrompt]   = useState("")
    const [loading,  setLoading]  = useState<string | null>(null)
    const [result,   setResult]   = useState("")

    function simulate(label: string) {
        setLoading(label)
        setTimeout(() => {
            setResult(`✨ AI improved version of your content based on "${label}" — ready to apply!`)
            setLoading(null)
        }, 1400)
    }

    function generate() {
        if (!prompt.trim()) return
        setLoading("prompt")
        setTimeout(() => {
            setResult(`✨ Generated content for: "${prompt}"`)
            setLoading(null)
        }, 1600)
    }

    return (
        <PanelCard title="AI Assistant" icon={<Sparkles size={14}/>} defaultOpen={false}>
            <div className="px-4 py-3 space-y-3">
                {/* Prompt */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder='Try "Rewrite for LinkedIn professionals"'
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && generate()}
                        className="flex-1 h-8 px-3 rounded-xl bg-muted/50 border border-border/60 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button onClick={generate} disabled={loading !== null}
                        className="h-8 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors shrink-0">
                        {loading === "prompt" ? <Loader2 size={12} className="animate-spin"/> : <Wand2 size={12}/>}
                    </button>
                </div>

                {/* Quick action buttons */}
                <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_ACTIONS.map(a => (
                        <button
                            key={a.label}
                            type="button"
                            onClick={() => simulate(a.label)}
                            disabled={loading !== null}
                            className={cn(
                                "flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-medium transition-all text-left",
                                loading === a.label
                                    ? "border-primary/50 bg-primary/8 text-primary"
                                    : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/30",
                            )}
                            style={ loading === a.label ? { background: "color-mix(in srgb, var(--primary) 8%, transparent)" } : undefined }
                        >
                            {loading === a.label
                                ? <Loader2 size={11} className="animate-spin shrink-0 text-primary"/>
                                : <span className="text-sm leading-none">{a.emoji}</span>
                            }
                            <span className="truncate">{a.label}</span>
                        </button>
                    ))}
                </div>

                {/* Result */}
                {result && (
                    <div className="rounded-xl bg-muted/50 border border-border/60 p-3 space-y-2">
                        <p className="text-xs text-foreground leading-relaxed">{result}</p>
                        <div className="flex gap-2">
                            <button onClick={() => { setContent(result); setResult("") }}
                                className="text-[11px] px-2.5 py-1 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                                Apply
                            </button>
                            <button onClick={() => setResult("")}
                                className="text-[11px] px-2.5 py-1 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors">
                                Dismiss
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PanelCard>
    )
}
