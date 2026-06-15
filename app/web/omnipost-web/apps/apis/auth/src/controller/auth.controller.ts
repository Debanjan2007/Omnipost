import {asyncHandler} from '../utils/ApiHandler'
import {ApiResHandler} from '../utils/ApiResHandler'
import {ApiErrHandler} from '../utils/ApiErrHandler'
import {prisma} from '@repo/database/src/index'
import {googleProvider, githubProvider} from '../authConfig/uniauth.conf'
import {truecallerAuthUrl} from '../authConfig/trueCaller.conf'
import type {Request, Response} from 'express'
import {httpurl} from "@deba_1307/uniauth";
import {userType} from "@repo/types/api-types/user.types";
import { generateToken } from '../utils/generateSessionToken'

const authUrlReturn = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const {auth1, auth2} = req.query
        const auth_state: 'signup' | 'login' = req.query?.auth_state as 'signup' | 'login'
        if (auth_state as string != 'signup' || auth_state as string != 'login') {
            res
                .status(400)
                .json(
                    new ApiErrHandler(400, null, "Invalid auth state")
                )
        }
        if (!req.query || !auth1 || !auth2) {
            res
                .status(400)
                .json(
                    new ApiErrHandler(400, null, "Missing required query parameters")
                )
        }
        if (auth1 !== process.env.AUTH_1 || auth2 !== process.env.AUTH_2 || auth2 !== process.env.AUTH_2A) {
            res
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
        res
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
        res
            .status(500)
            .json(
                new ApiErrHandler(500, error, "Something went wrong")
            )
    }
})

const signUp = asyncHandler(async (req: Request, res: Response) => {
    try{
        const userData: userType = req.user as userType
        const {user, accessToken, refreshToken} = generateToken(userData)
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                gender: user.gender,
                avatar: user.avatar,
                refreshToken: refreshToken,
                dob: user.dob,
                countryCode: user.countryCode,
                phoneNumber: user.phoneNumber,
            }
        })
        console.log(newUser)
        res
            .status(201)
            .json(
                new ApiResHandler(201 , { "user" : newUser , accessToken } , "User created successfully")
            )
    }catch (err){
        console.error(err)
        res
            .status(500)
            .json(
                new ApiErrHandler(500, null, "Something went wrong while signing up")
            )
    }
})

export {
    authUrlReturn,
    signUp
}