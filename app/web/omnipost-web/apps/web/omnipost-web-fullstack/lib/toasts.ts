/**
 * lib/toasts.ts
 *
 * Central registry for every toast notification in the application.
 *
 * ─── HOW TO ADD A NEW TOAST ───────────────────────────────────────────────────
 *  1. Add a new key to `ToastEventId` (the const-as-enum pattern keeps it
 *     tree-shakeable and avoids a real TypeScript enum).
 *  2. Add a matching entry to `toastRegistry` with title, description, and
 *     variant.
 *  3. Redirect to the relevant dashboard page with `?toast=<your_new_key>`.
 *
 *  No component changes are ever needed.
 * ──────────────────────────────────────────────────────────────────────────────
 */

// ---------------------------------------------------------------------------
// Variant type
// ---------------------------------------------------------------------------

export type ToastVariant = "success" | "error" | "warning" | "info"

// ---------------------------------------------------------------------------
// Toast definition shape
// ---------------------------------------------------------------------------

export interface ToastDefinition {
    variant: ToastVariant
    title: string
    description: string
}

// ---------------------------------------------------------------------------
// Exhaustive list of every toast event ID
// Prefer adding here over any other location in the codebase.
// ---------------------------------------------------------------------------

export const TOAST_EVENTS = {
    // ── LinkedIn ──────────────────────────────────────────────────────────
    linkedin_connected: "linkedin_connected",
    linkedin_auth_failed: "linkedin_auth_failed",
    linkedin_fetch_failed: "linkedin_fetch_failed",
    linkedin_callback_failed: "linkedin_callback_failed",
    linkedin_disconnected: "linkedin_disconnected",

    // ── Generic / infrastructure ──────────────────────────────────────────
    database_error: "database_error",
    unauthorized: "unauthorized",
    unknown_error: "unknown_error",
} as const

export type ToastEventId = (typeof TOAST_EVENTS)[keyof typeof TOAST_EVENTS]

// ---------------------------------------------------------------------------
// Registry
// Each key matches a ToastEventId exactly.
// ---------------------------------------------------------------------------

export const toastRegistry: Record<ToastEventId, ToastDefinition> = {
    // ── LinkedIn ──────────────────────────────────────────────────────────

    linkedin_connected: {
        variant: "success",
        title: "LinkedIn Connected",
        description: "Your LinkedIn account has been connected successfully.",
    },

    linkedin_auth_failed: {
        variant: "error",
        title: "LinkedIn Auth Failed",
        description:
            "We couldn't complete LinkedIn authorization. Please try again.",
    },

    linkedin_fetch_failed: {
        variant: "error",
        title: "LinkedIn Fetch Failed",
        description:
            "Your LinkedIn profile could not be retrieved. Please reconnect.",
    },

    linkedin_callback_failed: {
        variant: "error",
        title: "LinkedIn Callback Error",
        description:
            "Something went wrong during the LinkedIn callback. Please try again.",
    },

    linkedin_disconnected: {
        variant: "info",
        title: "LinkedIn Disconnected",
        description: "Your LinkedIn account has been disconnected.",
    },

    // ── Generic / infrastructure ──────────────────────────────────────────

    database_error: {
        variant: "error",
        title: "Database Error",
        description:
            "A database error occurred. Please try again or contact support.",
    },

    unauthorized: {
        variant: "warning",
        title: "Unauthorized",
        description: "You are not authorized to perform this action.",
    },

    unknown_error: {
        variant: "warning",
        title: "Unknown Error",
        description: "An unexpected error occurred. Please try again.",
    },
}

// ---------------------------------------------------------------------------
// Fallback shown when an unrecognized event ID arrives in the URL
// ---------------------------------------------------------------------------

export const FALLBACK_TOAST: ToastDefinition = {
    variant: "warning",
    title: "Unknown Event",
    description: "An unexpected action occurred.",
}

// ---------------------------------------------------------------------------
// Helper: resolve a raw string → ToastDefinition (never throws)
// ---------------------------------------------------------------------------

export function resolveToast(eventId: string | null): ToastDefinition | null {
    if (!eventId) return null

    if (eventId in toastRegistry) {
        return toastRegistry[eventId as ToastEventId]
    }

    return FALLBACK_TOAST
}
