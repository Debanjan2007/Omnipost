// Server Component — safely uses auth() from @clerk/nextjs/server
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/app/Components/DashboardHeader'

export default async function Dashboard() {
    const { userId } = await auth()

    // Belt-and-suspenders — proxy.ts middleware already redirects, but just in case
    if (!userId) redirect('/login')

    const user = await currentUser()

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">

            {/* Sticky header — client component for theme + profile context */}
            <DashboardHeader />

            <main className="px-6 md:px-8 py-10">
                <div className="max-w-5xl mx-auto space-y-10">

                    {/* Welcome */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground">
                            Welcome back, {user?.firstName ?? 'there'} 👋
                        </h2>
                        <p className="mt-1 text-muted-foreground">
                            Here&apos;s what&apos;s happening with your social media today.
                        </p>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {[
                            {
                                title: 'Posts Scheduled',
                                value: '0',
                                accent: 'var(--primary)',
                                sub: 'across all platforms',
                            },
                            {
                                title: 'Posts Published',
                                value: '0',
                                accent: 'var(--color-success)',
                                sub: 'this month',
                            },
                            {
                                title: 'Connected Accounts',
                                value: '0',
                                accent: 'var(--color-info)',
                                sub: 'of 4 platforms',
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="
                                    bg-card border border-border rounded-2xl p-6
                                    hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20
                                    transition-all duration-300 group
                                "
                            >
                                {/* Accent dot */}
                                <div
                                    className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
                                    style={{ background: `color-mix(in srgb, ${card.accent} 15%, transparent)` }}
                                >
                                    <div
                                        className="w-4 h-4 rounded-md"
                                        style={{ background: card.accent }}
                                    />
                                </div>

                                <div className="text-3xl font-bold text-foreground mb-1">
                                    {card.value}
                                </div>
                                <div className="text-sm font-medium text-foreground">
                                    {card.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                    {card.sub}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick actions */}
                    <div className="bg-card border border-border rounded-2xl p-6">
                        <h3 className="text-base font-semibold text-foreground mb-4">
                            Quick Actions
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {['Create Post', 'Connect Account', 'View Analytics', 'Schedule'].map(
                                (action) => (
                                    <button
                                        key={action}
                                        className="
                                            px-4 py-2 rounded-xl text-sm font-medium
                                            bg-secondary text-secondary-foreground
                                            hover:bg-primary hover:text-primary-foreground
                                            border border-border hover:border-primary
                                            transition-all duration-200
                                        "
                                    >
                                        {action}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}