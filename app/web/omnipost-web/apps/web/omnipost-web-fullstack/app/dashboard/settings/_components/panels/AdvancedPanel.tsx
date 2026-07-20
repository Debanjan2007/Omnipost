"use client"

import { useState } from "react"
import { Database, RefreshCw } from "lucide-react"

interface PanelProps {
    onChange: () => void
}

export function AdvancedPanel({ onChange }: PanelProps) {
    const [devMode, setDevMode] = useState(false)
    const [experimental, setExperimental] = useState(false)

    const handleExport = () => {
        alert("Preparing your workspace bundle backup... JSON download will start shortly.")
    }

    const handleReset = () => {
        if (confirm("WARNING: Are you sure you want to reset all preferences to defaults? This cannot be undone.")) {
            alert("Settings reset completed.")
        }
    }

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            <div>
                <h3 className="text-sm font-bold text-foreground">Advanced Options</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Manage workspace backups, imports, developer logs, and experimental settings.</p>
            </div>
            <div className="h-px bg-border/40" />

            <div className="space-y-4 text-xs">
                
                {/* Data Backup */}
                <div className="flex items-center justify-between gap-4 py-1.5 max-w-md">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">Export Workspace Data</p>
                        <p className="text-[10px] text-muted-foreground">Download a complete CSV/JSON archive of your scheduled queues, diagnostics data, and profiles config.</p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="h-8 px-3.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 shrink-0"
                    >
                        <Database size={12} /> Export Data
                    </button>
                </div>

                <div className="h-px bg-border/30" />

                {/* Developer Mode */}
                <label className="flex items-center justify-between gap-3 cursor-pointer py-1.5 max-w-md">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">Developer Logs Mode</p>
                        <p className="text-[10px] text-muted-foreground">Display detailed API response payloads and network latency charts inside history drawers.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setDevMode(!devMode); onChange() }}
                        className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${devMode ? "bg-primary" : "bg-muted"}`}
                        style={{ height: "18px" }}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${devMode && "translate-x-3.5"}`} />
                    </button>
                </label>

                <div className="h-px bg-border/30" />

                {/* Experimental Toggle */}
                <label className="flex items-center justify-between gap-3 cursor-pointer py-1.5 max-w-md">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-foreground">Experimental Alpha Features</p>
                        <p className="text-[10px] text-muted-foreground">Access upcoming features like TikTok direct reels autopublishing before official launch releases.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setExperimental(!experimental); onChange() }}
                        className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${experimental ? "bg-primary" : "bg-muted"}`}
                        style={{ height: "18px" }}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${experimental && "translate-x-3.5"}`} />
                    </button>
                </label>

                <div className="h-px bg-border/30" />

                {/* Reset settings */}
                <div className="flex items-center justify-between gap-4 py-1.5 max-w-md">
                    <div className="space-y-0.5">
                        <p className="font-semibold text-amber-500">Reset Workspace Preferences</p>
                        <p className="text-[10px] text-muted-foreground">Revert all themes, writing tones, scheduling defaults, and billing alerts to system defaults.</p>
                    </div>
                    <button
                        onClick={handleReset}
                        className="h-8 px-3.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 shrink-0"
                    >
                        <RefreshCw size={12} /> Reset System
                    </button>
                </div>

            </div>
        </div>
    )
}
