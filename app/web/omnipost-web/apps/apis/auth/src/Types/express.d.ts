import type { userType } from '@repo/types/index'

declare global {
    namespace Express {
        interface Request {
            user?: userType
        }
    }
}

export {}