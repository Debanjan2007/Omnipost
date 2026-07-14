"use client"

import { useState } from "react"
import { Calendar, Sparkles, Clock, RefreshCw, ChevronDown } from "lucide-react"
import { PanelCard } from "../ui/PanelCard"

const TIMEZONES  = ["UTC", "US/Eastern", "US/Pacific", "Europe/London", "Asia/Kolkata", "Asia/Tokyo"]
const REPEATS    = ["No repeat", "Daily", "Weekly", "Bi-weekly", "Monthly"]
const AI_TIPS    = [
    "🕖 Best time for Instagram: 6–8 PM on weekdays",
    "🕙 LinkedIn peaks Tuesday 10 AM – noon",
    "🕑 Twitter/X: weekdays 1–3 PM for max reach",
]

/**
 * SchedulingPanel — date, time, timezone, repeat, and AI best-time suggestion.
 */
export function SchedulingPanel() {
    const [mode,     setMode]     = useState<"now" | "schedule">("now")
    const [date,     setDate]     = useState("")
    const [time,     setTime]     = useState("")
    const [tz,       setTz]       = useState("Asia/Kolkata")
    const [repeat,   setRepeat]   = useState("No repeat")
    const [tip,      setTip]      = useState(0)
    const [loading,  setLoading]  = useState(false)

    function refreshTip() {
        setLoading(true)
        setTimeout(() => {
            setTip((tip + 1) % AI_TIPS.length)
            setLoading(false)
        }, 800)
    }

    return (
        <PanelCard title="Scheduling" icon={<Calendar size={14}/>} defaultOpen={true}>
            <div className="px-4 py-3 space-y-3">

                {/* Mode switch */}
                <div className="flex rounded-xl bg-muted p-0.5 gap-0.5">
                    {(["now", "schedule"] as const).map(m => (
                        <button key={m} type="button" onClick={() => setMode(m)}
                            className={`flex-1 h-7 rounded-lg text-xs font-medium transition-all ${mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
                            {m === "now" ? "Publish Now" : "Schedule"}
                        </button>
                    ))}
                </div>

                {mode === "schedule" && (
                    <>
                        {/* Date + Time */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-[11px] text-muted-foreground">Date</label>
                                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                                    className="w-full h-8 px-2.5 rounded-xl bg-muted/50 border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"/>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] text-muted-foreground">Time</label>
                                <input type="time" value={time} onChange={e => setTime(e.target.value)}
                                    className="w-full h-8 px-2.5 rounded-xl bg-muted/50 border border-border/60 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"/>
                            </div>
                        </div>

                        {/* Timezone */}
                        <div className="space-y-1">
                            <label className="text-[11px] text-muted-foreground">Timezone</label>
                            <div className="relative">
                                <select value={tz} onChange={e => setTz(e.target.value)}
                                    className="w-full h-8 pl-2.5 pr-7 rounded-xl bg-muted/50 border border-border/60 text-xs text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30">
                                    {TIMEZONES.map(t => <option key={t}>{t}</option>)}
                                </select>
                                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"/>
                            </div>
                        </div>

                        {/* Repeat */}
                        <div className="space-y-1">
                            <label className="text-[11px] text-muted-foreground">Repeat</label>
                            <div className="relative">
                                <select value={repeat} onChange={e => setRepeat(e.target.value)}
                                    className="w-full h-8 pl-2.5 pr-7 rounded-xl bg-muted/50 border border-border/60 text-xs text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30">
                                    {REPEATS.map(r => <option key={r}>{r}</option>)}
                                </select>
                                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"/>
                            </div>
                        </div>
                    </>
                )}

                {/* AI Best Time Suggestion */}
                <div className="rounded-xl border border-border/60 bg-primary/5 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
                            <Sparkles size={11} className="text-primary"/> AI Best Time
                        </p>
                        <button onClick={refreshTip}
                            className="w-6 h-6 rounded-lg hover:bg-primary/10 flex items-center justify-center text-muted-foreground">
                            <RefreshCw size={11} className={loading ? "animate-spin" : ""}/>
                        </button>
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed">{AI_TIPS[tip]}</p>
                    {mode === "schedule" && (
                        <button onClick={() => { setDate(new Date().toISOString().split("T")[0]); setTime("18:00") }}
                            className="text-[11px] text-primary hover:underline font-medium flex items-center gap-1">
                            <Clock size={10}/> Apply suggestion
                        </button>
                    )}
                </div>
            </div>
        </PanelCard>
    )
}
