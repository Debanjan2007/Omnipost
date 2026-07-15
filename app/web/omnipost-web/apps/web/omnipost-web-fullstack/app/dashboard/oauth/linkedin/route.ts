import auth from "@/app/dashboard/oauth/core";
import { NextResponse } from 'next/server'


const linkedin = auth.getProvider("linkedin");

export function GET(request: Request){
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const authorizationUrl = linkedin.getAuthorizationUrl()
        console.log("oauth url is: ", authorizationUrl)
        if(!authorizationUrl) {
            console.log("Authorization URL not found");
            return NextResponse.redirect(
                new URL("/dashboard", request.url)
            )
        }
        return NextResponse.redirect(
            new URL(authorizationUrl)
        )
    }catch (error) {
        console.log(error);
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        )
    }
}