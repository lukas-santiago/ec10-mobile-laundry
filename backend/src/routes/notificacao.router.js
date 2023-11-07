import { Router } from 'express'
// import { check } from '../utils/validator.js'
// import { ServicoValidator } from '../validators/servico.validator.js'
import * as notificacaoService from '../controllers/notificacao.controller.js'

const router = new Router()

// const { create, update } = ServicoValidator

router.post('/notificacao/byUser', notificacaoService.listNotificacoesByUser)
router.post('/notificacao/:notificacaoId/disable', notificacaoService.disableNotificacao)
// router.get('/notificacao', notificacaoService.listNotificacoes)
// router.post('/notificacao', check(create), notificacaoService.createService)
// router.get('/notificacao/:id', notificacaoService.getService)
// router.put('/notificacao/:id', check(update), notificacaoService.updateService)
// router.delete('/notificacao/:id', notificacaoService.deleteService)

export default router
