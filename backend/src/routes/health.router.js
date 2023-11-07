import express from 'express'
import * as healthController from '../controllers/health.controller.js'

const router = express.Router()

router.get('/health', healthController.healthCheck)

export default router
