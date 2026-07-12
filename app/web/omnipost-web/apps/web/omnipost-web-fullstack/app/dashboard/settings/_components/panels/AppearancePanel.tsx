"use client"

import { useState } from "react"
import { Sun, Moon, Laptop, RotateCcw, AlertTriangle } from "lucide-react"

interface AppearancePanelProps {
    draftTheme: "light" | "dark" | "system"
    setDraftTheme: (t: "light" | "dark" | "system") => void
    draftAccent: "indigo" | "purple" | "blue" | "green" | "pink" | "orange"
    setDraftAccent: (a: "indigo" | "purple" | "blue" | "green" | "pink" | "orange") => void
    draftDensity: "comfortable" | "compact"
    setDraftDensity: (d: "comfortable" | "compact") => void
    draftAnimations: boolean
    setDraftAnimations: (a: boolean) => void
    onResetToDefaults: () => Promise<void>
}

export function AppearancePanel({
    draftTheme,
    setDraftTheme,
    draftAccent,
    setDraftAccent,
    draftDensity,
    setDraftDensity,
    draftAnimations,
    setDraftAnimations,
    onResetToDefaults,
}: AppearancePanelProps) {
    const [showResetConfirm, setShowResetConfirm] = useState(false)
    const [isResetting, setIsResetting] = useState(false)

    const accentColors = [
        { id: "indigo" as const, name: "Indigo", bg: "bg-indigo-600" },
        { id: "purple" as const, name: "Purple", bg: "bg-purple-600" },
        { id: "blue" as const, name: "Blue", bg: "bg-blue-600" },
        { id: "green" as const, name: "Green", bg: "bg-emerald-600" },
        { id: "pink" as const, name: "Pink", bg: "bg-pink-600" },
        { id: "orange" as const, name: "Orange", bg: "bg-orange-600" },
    ]

    const handleConfirmReset = async () => {
        setIsResetting(true)
        try {
            await onResetToDefaults()
        } finally {
            setIsResetting(false)
            setShowResetConfirm(false)
        }
    }

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5 relative">
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
                                onClick={() => setDraftTheme(t.id)}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                                    draftTheme === t.id
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
                    <div className="flex flex-wrap gap-2.5">
                        {accentColors.map(c => (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => setDraftAccent(c.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                                    draftAccent === c.id ? "border-primary scale-110 shadow-sm" : "border-transparent hover:scale-105"
                                }`}
                                title={c.name}
                            >
                                <span className={`w-5.5 h-5.5 rounded-full ${c.bg} shadow-inner`} />
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
                            { id: "compact", label: "Compact", desc: "Closer text & padding" },
                            { id: "comfortable", label: "Comfortable", desc: "Generous spacing" }
                        ] as const).map(d => (
                            <button
                                key={d.id}
                                type="button"
                                onClick={() => setDraftDensity(d.id)}
                                className={`flex flex-col items-start gap-0.5 p-3 rounded-xl border text-left transition-all ${
                                    draftDensity === d.id
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
                            <p className="text-[10px] text-muted-foreground">Render transitions and overlays with animations (Disable to reduce CPU/GPU usage).</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setDraftAnimations(!draftAnimations)}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${draftAnimations ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${draftAnimations && "translate-x-3.5"}`} />
                        </button>
                    </label>
                </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
                <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="h-8 px-3 rounded-xl border border-border hover:bg-muted/40 text-[10px] font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-all"
                >
                    <RotateCcw size={11} /> Reset to Defaults
                </button>
                <span className="text-[10px] text-muted-foreground italic">Use the bottom bar to save appearance settings.</span>
            </div>

            {/* Premium Confirmation Modal Overlay */}
            {showResetConfirm && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-card border border-border shadow-2xl rounded-2xl max-w-sm w-full p-5 space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                                <AlertTriangle size={20} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-foreground">Reset Appearance?</h4>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    Are you sure you want to reset all design preferences to factory defaults? This will immediately apply standard Indigo accent, Comfortable density, and enable animations.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 text-xs pt-1">
                            <button
                                type="button"
                                disabled={isResetting}
                                onClick={() => setShowResetConfirm(false)}
                                className="h-8 px-3.5 rounded-xl border border-border hover:bg-muted font-semibold text-foreground transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={isResetting}
                                onClick={handleConfirmReset}
                                className="h-8 px-3.5 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold transition-all flex items-center gap-1 shadow-sm"
                            >
                                {isResetting ? "Resetting..." : "Confirm Reset"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
