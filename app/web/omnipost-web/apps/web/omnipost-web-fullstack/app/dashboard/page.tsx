// Server Component — oauth check then hands off to the client overview.
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardOverview } from '@/app/Components/dashboard/DashboardOverview'

export default async function DashboardPage() {
    const { userId } = await auth()
    if (!userId) redirect('/login')

    const user = await currentUser()

    return (
        <DashboardOverview firstName={user?.firstName ?? 'there'} />
    )
}