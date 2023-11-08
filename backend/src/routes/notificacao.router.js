import { Router } from 'express'
// import { check } from '../utils/validator.js'
// import { ServicoValidator } from '../validators/servico.validator.js'
import * as notificacaoService from '../controllers/notificacao.controller.js'

const router = new Router()

// const { create, update } = ServicoValidator

router.get('/notification/byUser', notificacaoService.listNotificacoesByUser)
router.get('/notification/countActive', notificacaoService.countActive)
router.post('/notification/:notificacaoId/disable', notificacaoService.disableNotificacao)
// router.get('/notification', notificacaoService.listNotificacoes)
// router.post('/notification', check(create), notificacaoService.createService)
// router.get('/notification/:id', notificacaoService.getService)
// router.put('/notification/:id', check(update), notificacaoService.updateService)
// router.delete('/notification/:id', notificacaoService.deleteService)

export default router
