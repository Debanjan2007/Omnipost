import { Uniauth } from "@deba_1307/uniauth"
import type { httpurl } from "@deba_1307/uniauth"

const auth = new Uniauth({
    providers: {
        linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID as unknown as string,
            scope: [
                "openid" ,
                "profile" ,
                "email" ,
                "w_member_social"
            ] ,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as unknown as string,
            redirecturl: process.env.LINKEDIN_REDIRECT_URL as unknown as httpurl,
        }
    }
})

export default auth