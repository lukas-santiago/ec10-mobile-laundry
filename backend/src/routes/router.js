import express from 'express'

import * as healthController from '../controllers/health.controller.js'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

router.get('/health', healthController.healthCheck)

router.get('/user', userController.listUsers)
router.post('/user', userController.createUser)
router.get('/user/:id', userController.getUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

export default router
