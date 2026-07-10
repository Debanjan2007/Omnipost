// Server Component — can safely use auth() from @clerk/nextjs/server
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const { userId } = await auth()

    // Extra guard — middleware already handles this, but belt-and-suspenders
    if (!userId) {
        redirect('/login')
    }

    const user = await currentUser()

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border px-8 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-foreground">OmniPost Dashboard</h1>
                <div className="flex items-center gap-3">
                    {user?.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.imageUrl}
                            alt={user.firstName ?? 'User'}
                            className="w-9 h-9 rounded-full border-2 border-primary/30"
                        />
                    )}
                    <span className="text-sm font-medium text-foreground">
                        {user?.firstName} {user?.lastName}
                    </span>
                </div>
            </header>

            <main className="px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                        Welcome back, {user?.firstName ?? 'there'} 👋
                    </h2>
                    <p className="text-muted-foreground mb-10">
                        Your social media command centre.
                    </p>

                    {/* Placeholder cards — replace with real dashboard content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Posts Scheduled', value: '0', color: 'var(--primary)' },
                            { title: 'Posts Published', value: '0', color: '#22C55E' },
                            { title: 'Connected Accounts', value: '0', color: '#3B82F6' },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl mb-4"
                                    style={{ background: `${card.color}20` }}
                                />
                                <div className="text-3xl font-bold text-foreground mb-1">{card.value}</div>
                                <div className="text-sm text-muted-foreground">{card.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}