import express from 'express'

import * as healthController from '../controllers/health.controller.js'
import * as userController from '../controllers/user.controller.js'

import { check } from '../utils/validator.js'

import { UserValidator } from '../validators/user.validator.js'

const router = express.Router()

router.get('/health', healthController.healthCheck)

const { create, update } = UserValidator

router.get('/user', userController.listUsers)
router.post('/user', check(create), userController.createUser)
router.get('/user/:id', userController.getUser)
router.put('/user/:id', check(update), userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

export default router
