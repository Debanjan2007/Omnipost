"use server"

import { prisma } from "@repo/database/src/index"
import { cookies } from "next/headers";


const DisconnectAccount = async () => {
    const cookieStore = await cookies()
    const OmnipostUser = cookieStore.get('omnipost_user')?.value
    if (!OmnipostUser) return
    const user = JSON.parse(OmnipostUser)
    await prisma.accounts.deleteMany({
        where: {
            userID: user.clerkId,
        }
    })
    return { success: true }
}

export { DisconnectAccount }