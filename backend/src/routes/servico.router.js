import { Router } from 'express'
import { check } from '../utils/validator.js'
import { ServicoValidator } from '../validators/servico.validator.js'
import * as servicoController from '../controllers/servico.controller.js'

const router = new Router()

const { create, update } = ServicoValidator

router.get('/service', servicoController.listServices)
router.post('/service', check(create), servicoController.createService)
router.get('/service/:id', servicoController.getService)
router.put('/service/:id', check(update), servicoController.updateService)
router.delete('/service/:id', servicoController.deleteService)

export default router
