"use client"

import { useState } from "react"
import { BarChart2, Plus, X, Clock, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const DURATIONS = ["1 day", "3 days", "7 days", "14 days", "1 month"]

/**
 * PollCreator — toggle-enabled poll section.
 * Handles question, up to 4 choices, and expiration.
 */
export function PollCreator() {
    const [enabled,  setEnabled]  = useState(false)
    const [question, setQuestion] = useState("")
    const [choices,  setChoices]  = useState(["", ""])
    const [duration, setDuration] = useState("7 days")

    function addChoice() {
        if (choices.length >= 4) return
        setChoices([...choices, ""])
    }
    function removeChoice(i: number) {
        if (choices.length <= 2) return
        setChoices(choices.filter((_, idx) => idx !== i))
    }
    function updateChoice(i: number, val: string) {
        setChoices(choices.map((c, idx) => idx === i ? val : c))
    }

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {/* Header with toggle */}
            <div className="px-4 py-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <BarChart2 size={14} className="text-muted-foreground"/>
                    Poll
                </h3>
                <button
                    type="button"
                    onClick={() => setEnabled(!enabled)}
                    className={cn(
                        "relative w-9 h-5 rounded-full transition-colors",
                        enabled ? "bg-primary" : "bg-muted",
                    )}
                    aria-label="Toggle poll"
                >
                    <span className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
                        enabled && "translate-x-4",
                    )}/>
                </button>
            </div>

            {/* Poll form */}
            {enabled && (
                <div className="border-t border-border/50 px-4 pb-4 pt-3 space-y-3">
                    {/* Question */}
                    <input
                        type="text"
                        placeholder="Ask your audience a question…"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl bg-muted/50 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />

                    {/* Choices */}
                    <div className="space-y-2">
                        {choices.map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center text-[10px] text-muted-foreground font-bold shrink-0">
                                    {String.fromCharCode(65 + i)}
                                </span>
                                <input
                                    type="text"
                                    placeholder={`Choice ${i + 1}`}
                                    value={c}
                                    onChange={e => updateChoice(i, e.target.value)}
                                    className="flex-1 h-8 px-3 rounded-lg bg-muted/50 border border-border/60 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                                {choices.length > 2 && (
                                    <button onClick={() => removeChoice(i)} className="shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground">
                                        <X size={12}/>
                                    </button>
                                )}
                            </div>
                        ))}

                        {choices.length < 4 && (
                            <button onClick={addChoice}
                                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium">
                                <Plus size={12}/> Add choice
                            </button>
                        )}
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2">
                        <Clock size={13} className="text-muted-foreground shrink-0"/>
                        <span className="text-xs text-muted-foreground">Expires in:</span>
                        <div className="relative flex-1">
                            <select
                                value={duration}
                                onChange={e => setDuration(e.target.value)}
                                className="w-full h-8 pl-3 pr-7 rounded-lg bg-muted/50 border border-border/60 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                            >
                                {DURATIONS.map(d => <option key={d}>{d}</option>)}
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
