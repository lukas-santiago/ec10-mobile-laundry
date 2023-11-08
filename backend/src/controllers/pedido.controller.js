import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as notificacaoService from '../services/notificacao.service.js'
import * as pedidoService from '../services/pedido.service.js'
import * as serviceService from '../services/servico.service.js'
import * as usuarioService from '../services/usuario.service.js'

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
				name: pedido.servico.nome,
				description: pedido.servico.descricao,
				status: pedido.status,
				price: pedido.preco,
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
		const { status } = req.body

		const acceptedStatuses = ['Em andamento', 'Rejeitado', 'Finalizado']

		if (!acceptedStatuses.includes(status))
			return next(new AppError('Status inválido', httpStatus.BAD_REQUEST))

		const updated = await pedidoService.updatePedido(Number(id), status)
		const service = await serviceService.getServicoById(
			Number(updated.servico_id)
		)

		const usuario = await usuarioService.getUserById(updated.usuario_id)

		if (status === 'Rejeitado') {
			await notificacaoService.createNotificacao(
				usuario.id,
				`O Pedido "${service.nome}" foi rejeitado pelo fornecedor.`
			)
		} else if (status === 'Finalizado') {
			await notificacaoService.createNotificacao(
				usuario.id,
				`O Pedido "${service.nome}" foi finalizado.`
			)
		} else if (status === 'Em andamento') {
			await notificacaoService.createNotificacao(
				usuario.id,
				`O Pedido "${service.nome}" foi aceito e está em andamento. Aguarde a finalização.`
			)
		}

		res.json(updated)
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
