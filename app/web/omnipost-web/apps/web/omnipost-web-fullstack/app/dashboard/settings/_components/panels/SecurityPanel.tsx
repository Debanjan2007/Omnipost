"use client"

import { useState } from "react"
import { Shield, KeyRound, Monitor, Smartphone, Trash2 } from "lucide-react"

interface PanelProps {
    onChange: () => void
}

export function SecurityPanel({ onChange }: PanelProps) {
    const [tfa, setTfa] = useState(false)
    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")

    return (
        <div className="space-y-5">
            
            {/* Core credentials card */}
            <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
                <div>
                    <h3 className="text-sm font-bold text-foreground">Sign In & Password</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Keep your account safe by updating your credentials regularly.</p>
                </div>
                <div className="h-px bg-border/40" />

                <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-muted-foreground">Current Password</label>
                            <input
                                type="password"
                                value={currentPass}
                                onChange={(e) => { setCurrentPass(e.target.value); onChange() }}
                                className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-muted-foreground">New Password</label>
                            <input
                                type="password"
                                value={newPass}
                                onChange={(e) => { setNewPass(e.target.value); onChange() }}
                                className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="h-px bg-border/30" />

                    {/* Two-Factor Toggle */}
                    <label className="flex items-center justify-between gap-3 cursor-pointer py-1.5 max-w-md">
                        <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">Two-Factor Authentication (2FA)</p>
                            <p className="text-[10px] text-muted-foreground">Provide an extra code from your authenticator app when signing in.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setTfa(!tfa); onChange() }}
                            className={`relative w-8 h-4.5 rounded-full transition-colors shrink-0 ${tfa ? "bg-primary" : "bg-muted"}`}
                            style={{ height: "18px" }}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${tfa && "translate-x-3.5"}`} />
                        </button>
                    </label>
                </div>

                <div className="pt-2 flex justify-end">
                    <button type="submit" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all">
                        Update Password
                    </button>
                </div>
            </div>

            {/* Active Sessions list */}
            <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">
                <div>
                    <h3 className="text-sm font-bold text-foreground">Active Sessions</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Manage and revoke active login tokens configured on trusted devices.</p>
                </div>
                <div className="h-px bg-border/40" />

                <div className="space-y-3.5 text-xs">
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/10">
                        <div className="flex items-start gap-3">
                            <Monitor size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <p className="font-semibold text-foreground">Windows 11 PC · Kolkata, India</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">Chrome Browser · Active Session (This Device)</p>
                            </div>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            Current
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/10">
                        <div className="flex items-start gap-3">
                            <Smartphone size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <p className="font-semibold text-foreground">iPhone 15 Pro · Bengaluru, India</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">OmniPost Mobile Beta · 3 hours ago</p>
                            </div>
                        </div>
                        <button type="button" className="text-[10px] font-semibold text-red-500 hover:underline">
                            Revoke
                        </button>
                    </div>
                </div>
            </div>

            {/* Danger Zone Account deletion */}
            <div className="bg-card border border-red-500/20 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-red-500">
                    <Shield size={16} />
                    <h3 className="text-sm font-bold">Danger Zone</h3>
                </div>
                <div className="h-px bg-border/40" />

                <div className="flex items-center justify-between gap-4 text-xs py-1.5">
                    <div className="space-y-0.5">
                        <p className="font-bold text-red-500">Delete Account</p>
                        <p className="text-[10px] text-muted-foreground">Permanently delete your profile data, connected channels keys, and scheduled drafts.</p>
                    </div>
                    <button type="button" className="h-8 px-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-all shrink-0 shadow-sm flex items-center gap-1">
                        <Trash2 size={12} /> Delete Account
                    </button>
                </div>
            </div>

        </div>
    )
}
