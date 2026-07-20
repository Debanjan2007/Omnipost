"use client"

import { useState } from "react"
import { MOCK_WORKSPACE } from "../data/settingsData"
import { Building, ShieldAlert } from "lucide-react"

interface PanelProps {
    onChange: () => void
}

export function WorkspacePanel({ onChange }: PanelProps) {
    const [workspace, setWorkspace] = useState(MOCK_WORKSPACE)

    const handleChange = (field: string, val: string) => {
        setWorkspace(prev => ({ ...prev, [field]: val }))
        onChange()
    }

    return (
        <div className="space-y-5">
            {/* Core Workspace Settings Card */}
            <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
                <div>
                    <h3 className="text-sm font-bold text-foreground">Workspace Profile</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Configure details for your collaborative workspaces and projects.</p>
                </div>
                <div className="h-px bg-border/40" />

                {/* Workspace Logo Upload */}
                <div className="flex items-center gap-4 py-1">
                    <div className="w-14 h-14 rounded-2xl border border-border bg-muted flex items-center justify-center text-muted-foreground shrink-0 shadow-sm">
                        <Building size={22} />
                    </div>
                    <div className="space-y-1">
                        <button type="button" className="h-7 px-3 rounded-lg border border-border bg-card hover:bg-muted text-[11px] font-semibold text-foreground transition-all">
                            Upload Logo
                        </button>
                        <p className="text-[9px] text-muted-foreground">Square PNG or SVG. Max size 1MB</p>
                    </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1 md:col-span-2">
                        <label className="text-[11px] font-semibold text-muted-foreground">Workspace Name</label>
                        <input
                            type="text"
                            value={workspace.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-muted-foreground">Default Timezone</label>
                        <select
                            value={workspace.defaultTimezone}
                            onChange={(e) => handleChange("defaultTimezone", e.target.value)}
                            className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none"
                        >
                            <option value="Asia/Kolkata">Kolkata (IST)</option>
                            <option value="UTC">UTC</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-muted-foreground">Default Language</label>
                        <select
                            value={workspace.defaultLanguage}
                            onChange={(e) => handleChange("defaultLanguage", e.target.value)}
                            className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none"
                        >
                            <option value="en-US">English (US)</option>
                            <option value="de-DE">Deutsch</option>
                        </select>
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button type="submit" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all">
                        Save Workspace Settings
                    </button>
                </div>
            </div>

            {/* Danger Zone Accordion Card */}
            <div className="bg-card border border-red-500/20 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-red-500">
                    <ShieldAlert size={16} />
                    <h3 className="text-sm font-bold">Danger Zone</h3>
                </div>
                <div className="h-px bg-border/40" />

                <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between gap-4 py-1.5">
                        <div className="space-y-0.5">
                            <p className="font-bold text-foreground">Transfer Workspace Ownership</p>
                            <p className="text-[10px] text-muted-foreground">Move this workspace and connected billing logs to another admin email address.</p>
                        </div>
                        <button type="button" className="h-8 px-3.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground transition-all shrink-0">
                            Transfer
                        </button>
                    </div>
                    <div className="h-px bg-border/30" />
                    <div className="flex items-center justify-between gap-4 py-1.5">
                        <div className="space-y-0.5">
                            <p className="font-bold text-red-500">Delete Workspace</p>
                            <p className="text-[10px] text-muted-foreground">Permanently delete this workspace, all scheduled queue events, and diagnostics metrics.</p>
                        </div>
                        <button type="button" className="h-8 px-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-all shrink-0 shadow-sm">
                            Delete Workspace
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
