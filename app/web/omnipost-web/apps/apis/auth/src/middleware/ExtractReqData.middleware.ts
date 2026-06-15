import type { Request , Response , NextFunction } from "express";
import type { userType } from '@repo/types/index'

const extractUserData = (req: Request, res: Response, next: NextFunction) => {
    const rawUserData = req?.body
    const userData: userType = {
        email: rawUserData?.email,
        name: rawUserData?.name,
        avatar: rawUserData?.avatar,
        gender: rawUserData?.gender,
        dob: new Date(rawUserData?.dob),
        countryCode: rawUserData?.countryCode ? rawUserData?.countryCode : null ,
        phoneNumber: rawUserData?.phoneNumber ? rawUserData?.phoneNumber : null ,
    }
    req.user = userData
}