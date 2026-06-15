import { Router } from 'express'
import { authUrlReturn , signUp } from '../controller/auth.controller'
import { extractUserData } from '../middleware/ExtractReqData.middleware'

const router = Router()

router.get('/authUrl', authUrlReturn)
router.post('/signup', extractUserData , signUp)

export default router