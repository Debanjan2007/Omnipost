"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useProfile } from "@/app/context"
import { Loader2 } from "lucide-react"

interface PanelProps {
    onChange: () => void
}

// ─── Loading Skeleton ──────────────────────────────────────────────────────────

function ProfileSkeleton() {
    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5 animate-pulse">
            <div>
                <div className="h-4 w-32 bg-muted rounded-md" />
                <div className="h-3 w-56 bg-muted/60 rounded-md mt-1.5" />
            </div>
            <div className="h-px bg-border/40" />
            <div className="flex items-center gap-4 py-1">
                <div className="w-14 h-14 rounded-full bg-muted shrink-0" />
                <div className="space-y-2">
                    <div className="h-7 w-24 bg-muted rounded-lg" />
                    <div className="h-2.5 w-36 bg-muted/50 rounded" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`space-y-1 ${i >= 2 && i <= 3 ? "md:col-span-2" : ""}`}>
                        <div className="h-3 w-20 bg-muted/70 rounded" />
                        <div className="h-8 w-full bg-muted/40 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export function ProfilePanel({ onChange }: PanelProps) {
    // ── User Context (single source of truth) ──────────────────────────────
    const { isLoaded, isSignedIn, firstName, lastName, email, avatarUrl, user } = useProfile()

    // useUser gives us the mutable Clerk user object for calling .update()
    const { user: clerkUser } = useUser()

    // ── Local draft state — seeded from context, editable locally ──────────
    const [draftFirstName, setDraftFirstName] = useState("")
    const [draftLastName, setDraftLastName]   = useState("")
    const [draftUsername, setDraftUsername]   = useState("")
    // bio / language / timezone are not stored in Clerk; kept as local UI state
    const [draftBio,      setDraftBio]        = useState("")
    const [draftLanguage, setDraftLanguage]   = useState("en-US")
    const [draftTimezone, setDraftTimezone]   = useState("Asia/Kolkata")

    // ── Save / error state ─────────────────────────────────────────────────
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState<string | null>(null)
    const [saveSuccess, setSaveSuccess] = useState(false)

    // ── Seed draft fields once Clerk has finished loading ──────────────────
    useEffect(() => {
        if (!isLoaded || !isSignedIn) return

        setDraftFirstName(firstName ?? "")
        setDraftLastName(lastName   ?? "")
        setDraftUsername((user as { username?: string | null })?.username ?? "")
        // bio / language / timezone have no Clerk equivalent — keep as defaults
    }, [isLoaded, isSignedIn, firstName, lastName, user])

    // ── Mark parent dirty on any field change ──────────────────────────────
    const markDirty = () => {
        onChange()
        setSaveError(null)
        setSaveSuccess(false)
    }

    // ── Save handler — persists to Clerk ──────────────────────────────────
    const handleSave = async () => {
        if (!clerkUser) return

        setIsSaving(true)
        setSaveError(null)
        setSaveSuccess(false)

        try {
            await clerkUser.update({
                firstName: draftFirstName.trim() || undefined,
                lastName:  draftLastName.trim()  || undefined,
                username:  draftUsername.trim()  || undefined,
            })
            setSaveSuccess(true)
            // Auto-clear success banner after 3 s
            setTimeout(() => setSaveSuccess(false), 3000)
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Failed to save changes. Please try again."
            setSaveError(message)
        } finally {
            setIsSaving(false)
        }
    }

    // ── Render: show skeleton while Clerk hydrates ─────────────────────────
    if (!isLoaded) return <ProfileSkeleton />

    // ── Render: guard against signed-out state ─────────────────────────────
    if (!isSignedIn) {
        return (
            <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm">
                <p className="text-sm text-muted-foreground">
                    You must be signed in to view profile settings.
                </p>
            </div>
        )
    }

    return (
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-5">

            {/* Header info */}
            <div>
                <h3 className="text-sm font-bold text-foreground">Profile Settings</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                    Manage your personal presence and account identity.
                </p>
            </div>
            <div className="h-px bg-border/40" />

            {/* Profile Avatar */}
            <div className="flex items-center gap-4 py-1">
                {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={avatarUrl}
                        alt={`${draftFirstName} ${draftLastName}`.trim() || "Profile"}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-border/40 bg-muted shrink-0"
                    />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-muted ring-2 ring-border/40 shrink-0 flex items-center justify-center text-lg font-bold text-muted-foreground select-none">
                        {(draftFirstName?.[0] ?? draftUsername?.[0] ?? "?").toUpperCase()}
                    </div>
                )}
                <div className="space-y-1">
                    <button
                        type="button"
                        className="h-7 px-3 rounded-lg border border-border bg-card hover:bg-muted text-[11px] font-semibold text-foreground transition-all"
                    >
                        Upload Photo
                    </button>
                    <p className="text-[9px] text-muted-foreground">JPG, PNG or SVG. Max size 2MB</p>
                </div>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">

                {/* First Name */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">First Name</label>
                    <input
                        type="text"
                        value={draftFirstName}
                        onChange={(e) => { setDraftFirstName(e.target.value); markDirty() }}
                        placeholder="First name"
                        className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Last Name</label>
                    <input
                        type="text"
                        value={draftLastName}
                        onChange={(e) => { setDraftLastName(e.target.value); markDirty() }}
                        placeholder="Last name"
                        className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>

                {/* Username */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Username</label>
                    <input
                        type="text"
                        value={draftUsername}
                        onChange={(e) => { setDraftUsername(e.target.value); markDirty() }}
                        placeholder="username"
                        className="w-full h-8 px-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>

                {/* Email — read-only, owned by Clerk */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">
                        Email Address
                        <span className="ml-1.5 text-[9px] font-normal text-muted-foreground/60">(managed by Clerk)</span>
                    </label>
                    <input
                        type="email"
                        value={email ?? ""}
                        readOnly
                        tabIndex={-1}
                        className="w-full h-8 px-3 rounded-lg bg-muted/10 border border-border/40 text-muted-foreground cursor-not-allowed font-medium"
                    />
                </div>

                {/* Bio — full width */}
                <div className="space-y-1 md:col-span-2">
                    <label className="text-[11px] font-semibold text-muted-foreground">Bio Description</label>
                    <textarea
                        rows={3}
                        value={draftBio}
                        onChange={(e) => { setDraftBio(e.target.value); markDirty() }}
                        placeholder="Tell your audience about yourself…"
                        className="w-full p-3 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                    />
                </div>

                {/* Language */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Language</label>
                    <select
                        value={draftLanguage}
                        onChange={(e) => { setDraftLanguage(e.target.value); markDirty() }}
                        className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none"
                    >
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="de-DE">Deutsch</option>
                        <option value="fr-FR">Français</option>
                    </select>
                </div>

                {/* Timezone */}
                <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground">Timezone</label>
                    <select
                        value={draftTimezone}
                        onChange={(e) => { setDraftTimezone(e.target.value); markDirty() }}
                        className="w-full h-8 px-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground focus:outline-none"
                    >
                        <option value="Asia/Kolkata">Kolkata (IST)</option>
                        <option value="UTC">UTC</option>
                        <option value="US/Pacific">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                    </select>
                </div>
            </div>

            {/* Save feedback */}
            {saveError && (
                <p className="text-[11px] text-destructive font-medium">{saveError}</p>
            )}
            {saveSuccess && (
                <p className="text-[11px] text-green-500 font-medium">Profile updated successfully.</p>
            )}

            {/* Actions */}
            <div className="pt-2 flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-8 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                    {isSaving && <Loader2 size={12} className="animate-spin" />}
                    {isSaving ? "Saving…" : "Save Changes"}
                </button>
            </div>
        </div>
    )
}
