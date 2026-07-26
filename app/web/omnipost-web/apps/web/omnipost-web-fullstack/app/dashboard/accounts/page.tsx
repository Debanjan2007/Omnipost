import { Suspense } from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ConnectedAccountsPage } from "./_components"
import AccountsLoading from "./loading"
import { prisma } from "@repo/database/src/index"
import { mapDbAccountToUiAccount } from "./_components/data/accountMappers"
import type { DbAccount } from "./_components/data/accountMappers"

export const metadata = {
    title: "Connected Accounts — OmniPost",
    description: "Manage and oauth your social media channels from one central security engine.",
}

/**
 * /dashboard/accounts — Server component that fetches real connected
 * accounts from the database before rendering the client orchestrator.
 */
export default async function AccountsPage() {
    const { userId } = await auth()
    if (!userId) redirect("/auth/login")

    // Fetch all accounts for this user from the database
    let initialAccounts: ReturnType<typeof mapDbAccountToUiAccount>[] = []
    try {
        const dbAccounts = await prisma.accounts.findMany({
            where: { 
                userID: userId,
                expiresAt: {
                    gt: new Date(),
                }
            },
        })
        initialAccounts = (dbAccounts as unknown as DbAccount[]).map(mapDbAccountToUiAccount)
    } catch (error) {
        console.error("[AccountsPage] Failed to fetch accounts:", error)
        // Gracefully fall back to empty — the UI will show the empty/connect state
    }

    return (
        <Suspense fallback={<AccountsLoading />}>
            <ConnectedAccountsPage initialAccounts={initialAccounts} />
        </Suspense>
    )
}

