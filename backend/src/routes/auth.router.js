import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = new Router()

router.post('/auth', authController.authenticate)
router.post('/register', authController.register)
// router.get('/me', authMiddleware, authController.me)

export default router
