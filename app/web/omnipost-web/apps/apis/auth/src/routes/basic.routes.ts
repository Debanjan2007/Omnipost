import { Router } from 'express'
import { authUrlReturn } from '../controller/auth.controller'

const router = Router()

// @ts-ignores
router.get('/authUrl', authUrlReturn)

export default router