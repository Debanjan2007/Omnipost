import { DashboardSkeleton } from "@/app/Components/dashboard/DashboardSkeleton"

/**
 * loading.tsx — Next.js App Router automatic Suspense boundary.
 *
 * While app/dashboard/page.tsx resolves its async oauth() + currentUser() calls,
 * Next.js renders this file in the content area.
 * The Sidebar and DashboardNav (from layout.tsx) stay visible immediately,
 * giving users instant shell feedback while data loads.
 */
export default function DashboardLoading() {
    return <DashboardSkeleton />
}
