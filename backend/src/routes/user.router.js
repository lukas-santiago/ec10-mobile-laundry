import { Router } from 'express'
import { check } from '../utils/validator.js'
import { UserValidator } from '../validators/user.validator.js'
import * as userController from '../controllers/usuario.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'

const router = new Router()

const { create, update } = UserValidator

// router.use(authMiddleware)

router.get('/user', userController.listUsers)
router.post('/user', check(create), userController.createUser)
router.get('/user/:id', userController.getUser)
router.put('/user/:id', check(update), userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

export default router
