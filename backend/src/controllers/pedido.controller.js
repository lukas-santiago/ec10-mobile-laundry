import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as pedidoService from '../services/pedido.service.js'
import * as serviceService from '../services/servico.service.js'
import * as notificacaoService from '../services/notificacao.service.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getPedido(req, res, next) {
	try {
		const { id } = req.params
		res.json(await pedidoService.getPedidoById(id))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function listPedidos(req, res, next) {
	try {
		const pedidos = await pedidoService.listPedidos()
		res.json(
			pedidos.map((pedido) => ({
				id: pedido.id,
				clienteId: pedido.clienteId,
				produtosId: pedido.produtosId,
				preco: pedido.preco,
			}))
		)
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createPedido(req, res, next) {
	try {
		const { clienteId, servicoId } = req.body

		const servico = await serviceService.getServicoById(servicoId)

		const pedido = await pedidoService.createPedido(
			clienteId,
			servicoId,
			servico.preco
		)

		await notificacaoService.createNotificacao(
			clienteId,
			`Pedido criado para "${servico.nome}"`,
			pedido.id
		)

		res.json(pedido)
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function updatePedido(req, res, next) {
	try {
		const { id } = req.params
		const { clienteId, produtoId, quantidade } = req.body
		res.json(
			await pedidoService.updatePedido(
				id,
				clienteId,
				produtoId,
				quantidade
			)
		)
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @return {void}
 * */
export async function deletePedido(req, res, next) {
	try {
		const { id } = req.params
		res.json(await pedidoService.deletePedido(id))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}
