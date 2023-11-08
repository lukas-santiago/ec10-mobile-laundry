import { Router } from 'express'
import { check } from '../utils/validator.js'
import { PedidoValidator } from '../validators/pedido.validator.js'
import * as pedidoController from '../controllers/pedido.controller.js'

const router = new Router()

const { create, update } = PedidoValidator

router.get('/order', pedidoController.listPedidos)
router.post('/order', check(create), pedidoController.createPedido)
router.get('/order/:id', pedidoController.getPedido)
router.put('/order/:id', check(update), pedidoController.updatePedido)
router.delete('/order/:id', pedidoController.deletePedido)

export default router
