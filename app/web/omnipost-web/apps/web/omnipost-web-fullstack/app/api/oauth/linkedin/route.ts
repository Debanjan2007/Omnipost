import auth from "@/app/dashboard/oauth/core"
import {NextRequest, NextResponse} from 'next/server';
import {prisma} from "@repo/database/src/index"
import {cookies} from 'next/headers'

const linkedin = auth.getProvider('Linkedin')

export async function GET(req: NextRequest) {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get("omnipost_user")
    console.log("userCookie is: ", userCookie?.value)
    if(!userCookie?.value || !userCookie) {
        return NextResponse.redirect(
            new URL('/dashboard?toast=${TOAST_EVENTS.linkedin_auth_failed}', req.url).toString(),
        )
    }
    const user = JSON.parse(userCookie.value)
    console.log("user is: ", user)
    if(!user || !user.clerkId) {
        console.log("user is null")
        return NextResponse.redirect(
            new URL('/dashboard?toast=${TOAST_EVENTS.linkedin_auth_failed}', req.url).toString(),
        )
    }
    const dbUserId: string = user.clerkId
    console.log("dbUserId is: ", dbUserId)
    try {
        const {searchParams} = req.nextUrl
        const code = searchParams.get('code')
        console.log("Code is : ", code)
        const token = await linkedin.exchangeCodeForToken(code as unknown as string)
        console.log("The token is : ", token)
        const profile = await linkedin.getUserProfile(token.accessToken)
        console.log("Profile is : ", profile)
        const expiresIn = token.expiresIn as unknown as number
        const account = await prisma.accounts.upsert({
            where: {
                userID_provider: {
                    userID: dbUserId,
                    provider: 'linkedin'
                }
            },
            update: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                expiresAt: new Date(Date.now() + expiresIn * 1000)
            },
            create: {
                userID: user.clerkId,
                provider: 'linkedin',
                providerAccountId: profile.email ? profile.email : "",
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                expiresAt: new Date(Date.now() + expiresIn * 1000)
            }
        })
        console.log("Accounts is : ", account)
        return NextResponse.redirect(
            new URL('/dashboard/accounts?toast=${TOAST_EVENTS.linkedin_connected}', req.url).toString(),
        )
    } catch (error) {
        console.log("error is: ",error)
        return NextResponse.redirect(
            new URL('/dashboard?toast=${TOAST_EVENTS.linkedin_callback_failed}', req.url).toString(),
        )
    }
}
