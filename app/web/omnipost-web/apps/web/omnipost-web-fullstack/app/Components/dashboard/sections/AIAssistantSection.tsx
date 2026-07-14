"use client"

// Prompt state requires client context.
import { useState } from "react"
import { Bot, Sparkles, Zap } from "lucide-react"
import { AI_SUGGESTIONS } from "../data/activity"
import { SectionCard } from "../ui/SectionCard"

// ─── AI prompt input ──────────────────────────────────────────────────────────

function PromptInput() {
    const [prompt, setPrompt] = useState("")

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot size={17} className="text-primary" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-foreground">AI Assistant</h2>
                    <p className="text-[11px] text-muted-foreground">Need help creating content?</p>
                </div>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Describe your post idea... e.g. 'Announce our summer sale on Instagram'"
                    className="flex-1 h-10 px-3.5 rounded-xl bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                />
                <button className="h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1.5 hover:bg-primary/90 transition-colors shrink-0 shadow-sm">
                    <Sparkles size={13} /> Generate
                </button>
            </div>
        </div>
    )
}

// ─── AI suggestions list ──────────────────────────────────────────────────────

function AISuggestions() {
    return (
        <div className="lg:w-80 space-y-3">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                AI Insights
            </p>
            <div className="flex flex-col gap-2">
                {AI_SUGGESTIONS.map((suggestion, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                        <Zap size={12} className="text-primary mt-0.5 shrink-0" />
                        <p className="text-xs text-foreground leading-relaxed">{suggestion}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

/**
 * AIAssistantSection — prompt input + AI insights side-by-side card.
 * Prompt state is scoped to PromptInput; AISuggestions is fully static.
 */
export function AIAssistantSection() {
    return (
        <section>
            <SectionCard className="overflow-hidden relative">
                {/* Subtle radial gradient accent */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden
                    style={{
                        background: "radial-gradient(ellipse at top right, var(--primary) 0%, transparent 55%)",
                        opacity:    0.04,
                    }}
                />

                <div className="relative p-5 sm:p-6 flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <PromptInput />
                    <AISuggestions />
                </div>
            </SectionCard>
        </section>
    )
}
