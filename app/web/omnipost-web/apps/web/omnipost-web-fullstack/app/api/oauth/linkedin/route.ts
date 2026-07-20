import auth from "@/app/dashboard/oauth/core"
import {NextRequest, NextResponse} from 'next/server';
import {prisma} from "@repo/database/src/index"
import {cookies} from 'next/headers'

const linkedin = auth.getProvider('Linkedin')

export async function GET(req: NextRequest) {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get("omnipost_user")

    let dbUserId: number | undefined = undefined
    if (userCookie?.value) {
        try {
            const parsed = JSON.parse(userCookie.value)
            if (typeof parsed.id === 'number') {
                dbUserId = parsed.id
            }
        } catch (e) {
            console.error("Failed to parse omnipost_user cookie in linkedin oauth route:", e)
            return NextResponse.redirect(
                new URL('/dashboard?error=linkedin_oauth_failed', req.url).toString(),
            )
        }
    }

    try {
        const {searchParams} = req.nextUrl
        const code = searchParams.get('code')
        console.log("Code is : ", code)
        const token = await linkedin.exchangeCodeForToken(code as unknown as string)
        console.log("The token is : ", token)
        const profile = await linkedin.getUserProfile(token.accessToken)
        console.log("Profile is : ", profile)

        let account = null
        if (dbUserId) {
            const existingAccount = await prisma.accounts.findFirst({
                where: {
                    userID: dbUserId,
                    provider: 'linkedin',
                }
            })

            if (existingAccount) {
                account = await prisma.accounts.update({
                    where: {id: existingAccount.id},
                    data: {
                        accessToken: token?.accessToken,
                        refreshToken: token?.refreshToken,
                        expiresAt: token.expiresIn as unknown as Date,
                    }
                })
            } else {
                account = await prisma.accounts.create({
                    data: {
                        userID: dbUserId,
                        provider: 'linkedin',
                        providerAccountId: profile.username || profile.email || '',
                        accessToken: token.accessToken,
                        expiresAt: token.expiresIn as unknown as Date,
                    }
                })
            }
        }
        console.log("Accounts is : ", account)
        return NextResponse.json({profile, account})
    } catch (error) {
        console.log("error is: ",error)
        return NextResponse.redirect(
            new URL('/dashboard?error=linkedin_oauth_failed', req.url).toString(),
        )
    }
}
