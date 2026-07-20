"use client"

/**
 * app/Components/dashboard/DashboardToastHandler.tsx
 *
 * Mounted ONCE inside the dashboard layout.
 * Reads the `toast` query parameter, looks it up in the central registry,
 * fires the appropriate Sonner toast, and cleans the URL — all without a
 * page reload and without ever showing duplicate toasts.
 *
 * ─── How it works ─────────────────────────────────────────────────────────
 *  1. On mount (or when searchParams change) the component reads `?toast=`.
 *  2. `resolveToast()` maps the raw string to a `ToastDefinition`.
 *  3. The definition is dispatched to the correct `toast.*()` method.
 *  4. `router.replace()` strips the `toast` param while preserving all others.
 *
 * ─── Duplicate-toast guard ────────────────────────────────────────────────
 *  A `useRef` tracks the last displayed event ID. React 18 Strict Mode
 *  double-invokes effects in development; the ref prevents a second toast
 *  from firing for the same event ID within the same render cycle.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { toast } from "sonner"
import { resolveToast, type ToastVariant } from "@/lib/toasts"

// ---------------------------------------------------------------------------
// Map variant → Sonner method
// ---------------------------------------------------------------------------

const toastDispatch: Record<ToastVariant, (title: string, options: object) => void> = {
    success: (title, opts) => toast.success(title, opts),
    error: (title, opts) => toast.error(title, opts),
    warning: (title, opts) => toast.warning(title, opts),
    info: (title, opts) => toast.info(title, opts),
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardToastHandler() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    /**
     * Tracks the most recently shown event ID so that React Strict Mode's
     * double-effect invocation in development doesn't produce duplicate toasts.
     */
    const lastShownRef = useRef<string | null>(null)

    useEffect(() => {
        const eventId = searchParams.get("toast")

        // No param — nothing to do.
        if (!eventId) return

        // Guard: already showed this exact event ID in this render cycle.
        if (lastShownRef.current === eventId) return
        lastShownRef.current = eventId

        // Resolve the event → definition (returns FALLBACK_TOAST for unknowns).
        const definition = resolveToast(eventId)
        if (!definition) return

        // Fire the correct Sonner toast variant.
        const dispatch = toastDispatch[definition.variant]
        dispatch(definition.title, { description: definition.description })

        // ── Strip `toast` from the URL without reloading ──────────────────
        const params = new URLSearchParams(searchParams.toString())
        params.delete("toast")

        const newUrl = params.size > 0
            ? `${pathname}?${params.toString()}`
            : pathname

        // `replace` keeps the browser history clean — no extra back-button entry.
        router.replace(newUrl)

        // Reset the ref after a tick so future navigations can trigger again.
        const timerId = setTimeout(() => {
            lastShownRef.current = null
        }, 500)

        return () => clearTimeout(timerId)

        // Re-run whenever the search params change (new navigation).
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    // This component renders nothing — it is purely side-effect driven.
    return null
}
