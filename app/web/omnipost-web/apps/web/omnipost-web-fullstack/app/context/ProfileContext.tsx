"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useUser } from "@clerk/nextjs"
// Minimal UserResource type to avoid depending on @clerk/types in this file
type UserResource = {
    firstName?: string | null
    lastName?: string | null
    username?: string | null
    imageUrl?: string | null
    primaryEmailAddress?: { emailAddress?: string | null } | null
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProfileContextValue {
    /** The full Clerk UserResource object — null when signed out, undefined while loading */
    user: UserResource | null | undefined
    /** True once Clerk has finished hydrating (safe to render oauth-dependent UI) */
    isLoaded: boolean
    /** True when a user session is active */
    isSignedIn: boolean
    /** First + Last name, or username, or "Guest" — always a safe display string */
    displayName: string
    /** Primary email address */
    email: string | null
    /** Clerk profile image URL */
    avatarUrl: string | null
    /** First name only */
    firstName: string | null
    /** Last name only */
    lastName: string | null
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ProfileContext = createContext<ProfileContextValue | null>(null)

// ─── Provider ────────────────────────────────────────────────────────────────

/**
 * ProfileProvider
 *
 * Wraps Clerk's useUser() hook and exposes a flattened, typed profile object
 * to the entire component tree. Must be rendered inside <ClerkProvider>.
 */
export function ProfileProvider({ children }: { children: ReactNode }) {
    const { user, isLoaded, isSignedIn } = useUser()

    const firstName = user?.firstName ?? null
    const lastName = user?.lastName ?? null
    const email = user?.primaryEmailAddress?.emailAddress ?? null
    const avatarUrl = user?.imageUrl ?? null

    // Build a safe, non-empty display name
    const displayName =
        [firstName, lastName].filter(Boolean).join(" ").trim() ||
        user?.username ||
        email?.split("@")[0] ||
        "User"

    const value: ProfileContextValue = {
        user: user ?? null,
        isLoaded,
        isSignedIn: !!isSignedIn,
        displayName,
        email,
        avatarUrl,
        firstName,
        lastName,
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * useProfile — access the signed-in user's profile anywhere in the tree.
 *
 * @example
 * const { displayName, avatarUrl, isSignedIn } = useProfile()
 */
export function useProfile(): ProfileContextValue {
    const ctx = useContext(ProfileContext)
    if (!ctx) {
        throw new Error("useProfile() must be called inside <ProfileProvider>")
    }
    return ctx
}
