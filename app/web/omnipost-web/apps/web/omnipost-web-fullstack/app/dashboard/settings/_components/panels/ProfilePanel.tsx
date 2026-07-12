"use client"

import { useState } from "react"
import { MOCK_PROFILE } from "../data/settingsData"
import { cn } from "@/lib/utils"

interface PanelProps {
    onChange: () => void
}

export function ProfilePanel({ onChange }: PanelProps) {
    const [profile, setProfile] = useState(MOCK_PROFILE)

    const handleChange = (field: string, val: string) => {
        setProfile(prev => ({ ...prev, [field]: val }))
        onChange()
    }

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
            {/* Header info */}
            <div>
                <h3 className="text-sm font-bold text-foreground">Profile Settings</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Manage your personal presence and account identity.</p>
            </div>
            <div className="h-px bg-border/40" />

            {/* Profile Avatar Upload */}
            <div className="flex items-center gap-4 py-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={profile.avatarUrl}
                    alt={profile.displayName}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-border/40 bg-muted shrink-0"
                />
                <div className="space-y-1">
                    <button type="button" className="h-7 px-3 rounded-lg border border-border bg-card hover:bg-muted text-[11px] font-semibold text-foreground transition-all">
                        Upload Photo
                    </button>
                    <p className="text-[9px] text-muted-foreground">JPG, PNG or SVG. Max size 2MB</p>
                </div>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Display Name</label>
                    <input
                        type="text"
                        value={profile.displayName}
                        onChange={(e) => handleChange("displayName", e.target.value)}
                        className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Username</label>
                    <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
                <div className="space-y-1 md:col-span-2">
                    <label className="text-[11px] font-semibold text-muted-foreground">Email Address</label>
                    <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>
                <div className="space-y-1 md:col-span-2">
                    <label className="text-[11px] font-semibold text-muted-foreground">Bio Description</label>
                    <textarea
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        className="w-full p-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Language</label>
                    <select
                        value={profile.language}
                        onChange={(e) => handleChange("language", e.target.value)}
                        className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none"
                    >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="de-DE">Deutsch</option>
                        <option value="fr-FR">Français</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Timezone</label>
                    <select
                        value={profile.timezone}
                        onChange={(e) => handleChange("timezone", e.target.value)}
                        className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none"
                    >
                        <option value="Asia/Kolkata">Kolkata (IST)</option>
                        <option value="UTC">UTC</option>
                        <option value="US/Pacific">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                    </select>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end">
                <button type="submit" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all">
                    Save Changes
                </button>
            </div>
        </div>
    )
}
