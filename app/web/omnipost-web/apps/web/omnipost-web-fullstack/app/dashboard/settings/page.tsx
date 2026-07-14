import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SettingsPageContent } from "./_components"

export const metadata = {
    title: "Settings — OmniPost",
    description: "Manage your account, workspace preferences, billing, and API tokens.",
}

/**
 * /dashboard/settingsProtected server component.
 * Auth check runs server-side; client SettingsPageContent renders the settings dashboard.
 */
export default async function SettingsPage() {
    const { userId } = await auth()
    if (!userId) redirect("/auth/login")

    return <SettingsPageContent/>
}
