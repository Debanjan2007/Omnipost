import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ConnectedAccountsPage } from "./_components"

export const metadata = {
    title: "Connected Accounts — OmniPost",
    description: "Manage and authorize your social media channels from one central security engine.",
}

/**
 * /dashboard/accounts — Server component checking auth
 * before rendering the ConnectedAccountsPage client orchestrator.
 */
export default async function AccountsPage() {
    const { userId } = await auth()
    if (!userId) redirect("/auth/login")

    return <ConnectedAccountsPage />
}
