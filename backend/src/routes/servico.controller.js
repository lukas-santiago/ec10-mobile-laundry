import { Router } from 'express'
import { check } from '../utils/validator.js'
import { ServicoValidator } from '../validators/servico.validator.js'
import * as servicoController from '../controllers/servico.controller.js'

const router = new Router()

const { create, update } = ServicoValidator

router.get('/servico', servicoController.listServices)
router.post('/servico', check(create), servicoController.createService)
router.get('/servico/:id', servicoController.getService)
router.put('/servico/:id', check(update), servicoController.updateService)
router.delete('/servico/:id', servicoController.deleteService)

export default router
