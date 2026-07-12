import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { CreatePostPage } from "./_components"

export const metadata = {
    title: "Create Post — OmniPost",
    description: "Create once and publish everywhere across all your connected social platforms.",
}

/**
 * /dashboard/create — protected server component.
 * Auth check runs server-side; the client CreatePostPage renders the full UI.
 */
export default async function CreatePage() {
    const { userId } = await auth()
    if (!userId) redirect("/auth/login")

    return <CreatePostPage/>
}
