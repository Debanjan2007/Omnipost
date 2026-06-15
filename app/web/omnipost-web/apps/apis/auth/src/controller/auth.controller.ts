import {asyncHandler} from '../utils/ApiHandler'
import {ApiResHandler} from '../utils/ApiResHandler'
import {ApiErrHandler} from '../utils/ApiErrHandler'
import {prisma} from '@repo/database/src/index'
import {googleProvider, githubProvider} from '../authConfig/uniauth.conf'
import {truecallerAuthUrl} from '../authConfig/trueCaller.conf'
import type {Request, Response} from 'express'
import {httpurl} from "@deba_1307/uniauth";

const authUrlReturn = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {auth1, auth2 } = req.query
        const auth_state : 'signup' | 'login' = req.query?.auth_state as 'signup' | 'login'
        if(auth_state as string != 'signup' || auth_state as string != 'login'){
            return res
                .status(400)
                .json(
                    new ApiErrHandler(400, null, "Invalid auth state")
                )
        }
        if (!req.query || !auth1 || !auth2) {
            return res
                .status(400)
                .json(
                    new ApiErrHandler(400, null, "Missing required query parameters")
                )
        }
        if (auth1 !== process.env.AUTH_1 || auth2 !== process.env.AUTH_2 || auth2 !== process.env.AUTH_2A) {
            return res
                .status(401)
                .json(
                    new ApiErrHandler(401, null, "Invalid auth code")
                )
        }
        const googleUrl: httpurl = googleProvider.getAuthorizationUrl()
        let auth2url: httpurl | null | string = null
        if (auth2 === process.env.AUTH2) {
            auth2url = githubProvider.getAuthorizationUrl()
        } else {
            auth2url = truecallerAuthUrl(auth_state as 'signup' | 'login')
        }
        return res
            .status(200)
            .json(
                new ApiResHandler(200,
                    {
                        "success": true,
                        "auth1Url": googleUrl,
                        "auth2Url": auth2url
                    }, "Auth url returned successfully")
            )
    } catch (error) {
        console.error(error)
        return res
            .status(500)
            .json(
                new ApiErrHandler(500, error, "Something went wrong")
            )
    }
})
export {
    authUrlReturn
}