import { Router } from 'express'
import healthRouter from './health.router.js'
import authRouter from './auth.router.js'
import userRouter from './user.router.js'
import servicoRouter from './servico.controller.js'

const router = new Router()

router.use(healthRouter)
router.use(authRouter)
router.use(userRouter)
router.use(servicoRouter)

export default router
