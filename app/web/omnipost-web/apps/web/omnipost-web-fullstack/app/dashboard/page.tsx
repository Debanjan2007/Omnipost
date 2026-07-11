// Server Component — auth guard + page content only.
// The sidebar + navbar shell are provided by layout.tsx.
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const { userId } = await auth()
    if (!userId) redirect('/login')

    const user = await currentUser()

    return (
        <div className="px-6 md:px-8 py-8 max-w-5xl mx-auto space-y-8">

            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    Welcome back, {user?.firstName ?? 'there'} 👋
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Here&apos;s what&apos;s happening with your social media today.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {[
                    {
                        title: 'Posts Scheduled',
                        value: '0',
                        sub: 'across all platforms',
                        color: 'var(--primary)',
                    },
                    {
                        title: 'Posts Published',
                        value: '0',
                        sub: 'this month',
                        color: 'var(--color-success)',
                    },
                    {
                        title: 'Connected Accounts',
                        value: '0',
                        sub: 'of 4 platforms',
                        color: 'var(--color-info)',
                    },
                ].map((card) => (
                    <div
                        key={card.title}
                        className="
                            bg-card border border-border rounded-2xl p-6
                            hover:shadow-md dark:hover:shadow-black/20
                            transition-all duration-300
                        "
                    >
                        <div
                            className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
                            style={{
                                background: `color-mix(in srgb, ${card.color} 15%, transparent)`,
                            }}
                        >
                            <div
                                className="w-4 h-4 rounded-md"
                                style={{ background: card.color }}
                            />
                        </div>
                        <div className="text-3xl font-bold text-foreground mb-1">{card.value}</div>
                        <div className="text-sm font-medium text-foreground">{card.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{card.sub}</div>
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    {['Create Post', 'Connect Account', 'View Analytics', 'Schedule'].map((action) => (
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
                    ))}
                </div>
            </div>

        </div>
    )
}