import auth from "@/app/dashboard/oauth/core";
import {NextResponse} from 'next/server'


const linkedin = auth.getProvider('Linkedin')

export function GET(request: Request) {
    try {
        console.log("getting linkedin oauth url linkedin: ", linkedin);
        const authorizationUrl = linkedin.getAuthorizationUrl()
        console.log("oauth url is: ", authorizationUrl)
        if (!authorizationUrl) {
            console.log("Authorization URL not found");
            return NextResponse.redirect(
                new URL("/dashboard", request.url)
            )
        }
        return NextResponse.redirect(
            new URL(authorizationUrl)
        )
    } catch
        (error) {
        console.log(error);
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        )
    }
}