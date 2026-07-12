"use client"

import { useState } from "react"
import { Sun, Moon, Laptop, Eye, EyeOff } from "lucide-react"

interface PanelProps {
    onChange: () => void
}

export function AppearancePanel({ onChange }: PanelProps) {
    const [theme, setTheme] = useState<"light" | "dark" | "system">("dark")
    const [accent, setAccent] = useState("indigo")
    const [density, setDensity] = useState<"compact" | "comfortable">("comfortable")
    const [motion, setMotion] = useState(true)

    const accentColors = [
        { id: "indigo", bg: "bg-indigo-500" },
        { id: "violet", bg: "bg-violet-500" },
        { id: "blue", bg: "bg-blue-500" },
        { id: "emerald", bg: "bg-emerald-500" },
        { id: "rose", bg: "bg-rose-500" }
    ]

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            <div>
                <h3 className="text-sm font-bold text-foreground">Theme & Interface Design</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Customize accent scales, layouts spacing modes, and theme preferences.</p>
            </div>
            <div className="h-px bg-border/40" />

            <div className="space-y-4.5 text-xs">
                {/* Theme Selector */}
                <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-muted-foreground">App Theme</label>
                    <div className="grid grid-cols-3 gap-2.5 max-w-md">
                        {([
                            { id: "light", label: "Light Theme", icon: <Sun size={14} /> },
                            { id: "dark", label: "Dark Theme", icon: <Moon size={14} /> },
                            { id: "system", label: "System Default", icon: <Laptop size={14} /> }
                        ] as const).map(t => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => { setTheme(t.id); onChange() }}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                                    theme === t.id
                                        ? "border-primary/50 bg-primary/8 text-primary ring-1 ring-primary/20"
                                        : "border-border/60 bg-muted/10 text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                }`}
                            >
                                {t.icon}
                                <span className="text-[10px] font-semibold">{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-muted-foreground">Accent Color</label>
                    <div className="flex gap-2">
                        {accentColors.map(c => (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => { setAccent(c.id); onChange() }}
                                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                                    accent === c.id ? "border-primary scale-110" : "border-transparent"
                                }`}
                            >
                                <span className={`w-4.5 h-4.5 rounded-full ${c.bg}`} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-border/40 my-3" />

                {/* Layout Density */}
                <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-muted-foreground">Density</label>
                    <div className="grid grid-cols-2 gap-2.5 max-w-xs">
                        {([
                            { id: "compact", label: "Compact", desc: "Closer text sizes" },
                            { id: "comfortable", label: "Comfortable", desc: "Generous padding" }
                        ] as const).map(d => (
                            <button
                                key={d.id}
                                type="button"
                                onClick={() => { setDensity(d.id); onChange() }}
                                className={`flex flex-col items-start gap-0.5 p-3 rounded-xl border text-left transition-all ${
                                    density === d.id
                                        ? "border-primary/50 bg-primary/8 text-primary ring-1 ring-primary/20"
                                        : "border-border/60 bg-muted/10 text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                }`}
                            >
                                <span className="text-[10px] font-semibold">{d.label}</span>
                                <span className="text-[9px] text-muted-foreground/80 leading-none">{d.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-border/40 my-3" />

                {/* Motion Toggles */}
                <div className="max-w-md">
                    <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                        <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">Smooth Animations</p>
                            <p className="text-[10px] text-muted-foreground">Render transitions and overlays with elastic animations (Disable to reduce CPU usage).</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setMotion(!motion); onChange() }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${motion ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${motion && "translate-x-3.5"}`} />
                        </button>
                    </label>
                </div>

            </div>

            <div className="pt-2 flex justify-end">
                <button type="submit" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all">
                    Apply Design Settings
                </button>
            </div>
        </div>
    )
}
