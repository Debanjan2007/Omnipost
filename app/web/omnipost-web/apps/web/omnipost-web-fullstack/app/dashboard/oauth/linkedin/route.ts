import auth from "@/app/dashboard/oauth/core"
import { TOAST_EVENTS } from "@/lib/toasts"
import { NextResponse } from "next/server"

const linkedin = auth.getProvider("Linkedin")

/**
 * GET /dashboard/oauth/linkedin
 *
 * Initiates the LinkedIn OAuth flow by redirecting the user to LinkedIn's
 * authorization page.
 *
 * On failure the user is redirected to the accounts page with a stable
 * toast event ID so that DashboardToastHandler can display the correct
 * Sonner notification without any raw error text leaking into the URL.
 */
export function GET(request: Request) {
    try {
        console.log("getting linkedin oauth url linkedin: ", linkedin)
        const authorizationUrl = linkedin.getAuthorizationUrl()
        console.log("oauth url is: ", authorizationUrl)

        if (!authorizationUrl) {
            console.log("Authorization URL not found")
            return NextResponse.redirect(
                new URL(
                    `/dashboard/accounts?toast=${TOAST_EVENTS.linkedin_auth_failed}`,
                    request.url,
                ),
            )
        }

        return NextResponse.redirect(new URL(authorizationUrl))
    } catch (error) {
        console.error("LinkedIn OAuth initiation error:", error)
        return NextResponse.redirect(
            new URL(
                `/dashboard/accounts?toast=${TOAST_EVENTS.linkedin_auth_failed}`,
                request.url,
            ),
        )
    }
}