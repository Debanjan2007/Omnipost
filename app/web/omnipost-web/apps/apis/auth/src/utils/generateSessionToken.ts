import jwt from 'jsonwebtoken'
import type {userType} from '@repo/types/api-types/user.types'

const generateToken = (user: userType) => {
    const accessToken = jwt.sign(user, process.env.JWT_SECRET as string, {expiresIn: '1d'})
    const payload = {
        name: user.name,
        email: user.email,
    }
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '7d'})
    user.refreshToken = refreshToken
    return {user , accessToken, refreshToken}
}
export {
    generateToken
}