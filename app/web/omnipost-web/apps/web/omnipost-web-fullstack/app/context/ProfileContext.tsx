"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
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

    useEffect(() => {
        if (!isLoaded) return

        if (isSignedIn && user) {
            // Read existing cookie to see if we have a database user ID saved
            let dbId: number | null = null
            try {
                const existingCookie = getClientCookie("omnipost_user")
                if (existingCookie) {
                    const parsed = JSON.parse(existingCookie)
                    if (parsed && parsed.clerkId === user.id && typeof parsed.id === "number") {
                        dbId = parsed.id
                    }
                }
            } catch (e) {
                console.error("Failed to parse omnipost_user cookie:", e)
            }

            const userObj = {
                id: dbId,
                clerkId: user.id,
                email,
                name: displayName,
                avatar: avatarUrl,
                firstName,
                lastName,
                username: user.username ?? null,
            }

            setClientCookie("omnipost_user", JSON.stringify(userObj), 7)
        } else {
            // Clear cookie on sign-out
            deleteClientCookie("omnipost_user")
        }
    }, [user, isLoaded, isSignedIn, displayName, email, avatarUrl, firstName, lastName])

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

// ─── Cookie Utilities ────────────────────────────────────────────────────────

function getClientCookie(name: string): string | null {
    if (typeof document === "undefined") return null
    const nameLenPlus = name.length + 1
    return (
        document.cookie
            .split(";")
            .map((c) => c.trim())
            .filter((cookie) => cookie.substring(0, nameLenPlus) === `${name}=`)
            .map((cookie) => decodeURIComponent(cookie.substring(nameLenPlus)))[0] ?? null
    )
}

function setClientCookie(name: string, value: string, days?: number) {
    if (typeof document === "undefined") return
    let expires = ""
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = `; expires=${date.toUTCString()}`
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax; secure`
}

function deleteClientCookie(name: string) {
    if (typeof document === "undefined") return
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; secure`
}
