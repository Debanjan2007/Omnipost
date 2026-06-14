import { Router } from 'express'
import { authUrlReturn } from '../controller/auth.controller'

const router = Router()

// @ts-ignores
router.get('/signup', authUrlReturn)

export default router