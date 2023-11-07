import { Router } from 'express'
import { check } from '../utils/validator.js'
import { PedidoValidator } from '../validators/pedido.validator.js'
import * as pedidoController from '../controllers/pedido.controller.js'

const router = new Router()

const { create, update } = PedidoValidator

router.get('/pedido', pedidoController.listPedidos)
router.post('/pedido', check(create), pedidoController.createPedido)
router.get('/pedido/:id', pedidoController.getPedido)
router.put('/pedido/:id', check(update), pedidoController.updatePedido)
router.delete('/pedido/:id', pedidoController.deletePedido)

export default router
