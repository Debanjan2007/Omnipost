import { Uniauth } from '@deba_1307/uniauth'
import type { httpurl } from '@deba_1307/uniauth'

const uniauth = new Uniauth({
    providers: {
        Google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirecturl: process.env.GOOGLE_REDIRECT_URL as httpurl,
            scope: ['openid', 'email', 'profile']
        },
        Github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            redirecturl: process.env.GITHUB_REDIRECT_URL as httpurl,
            scope: ['openid', 'email', 'profile']
        }
    }
})