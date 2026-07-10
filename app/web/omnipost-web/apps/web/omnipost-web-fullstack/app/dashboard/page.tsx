// Server Component — safely uses auth() from @clerk/nextjs/server
import {auth, currentUser} from '@clerk/nextjs/server'
import {redirect} from 'next/navigation'
import {DashboardHeader} from '@/app/Components/DashboardHeader'
import {Sidebar} from "@/app/Components/Sidebar"

export default async function Dashboard() {
    const {userId} = await auth()

    // Belt-and-suspenders — proxy.ts middleware already redirects, but just in case
    if (!userId) redirect('/login')

    const user = await currentUser()

    return (
        <div className="min-h-screen bg-background w-screen transition-colors duration-300 flex">
            <Sidebar/>

            {/* Main content column — takes remaining width */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Sticky header — client component for theme + profile context */}
                <DashboardHeader/>
            </div>
        </div>
    )
}