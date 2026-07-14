import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { HistoryPageContent } from "./_components"

export const metadata = {
    title: "Publishing History — OmniPost",
    description: "Track and review every publishing event across all connected social channels.",
}

/**
 * /dashboard/history — protected server component.
 * Auth check runs server-side; the client HistoryPageContent renders the full UI.
 */
export default async function HistoryPage() {
    const { userId } = await auth()
    if (!userId) redirect("/auth/login")

    return <HistoryPageContent/>
}
