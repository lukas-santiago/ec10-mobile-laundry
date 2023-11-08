import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as notificacaoService from '../services/notificacao.service.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getNotificacao(req, res, next) {
	try {
		const { id } = req.params
		res.json(await notificacaoService.getNotificacaoById(id))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function listNotificacoes(req, res, next) {
	try {
		res.json(await notificacaoService.listNotificacoes())
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function listNotificacoesByUser(req, res, next) {
	try {
		const { userId } = req.body
		const notificacao = await notificacaoService.listNotificacoesByUser(
			userId
		)
		res.json(
			notificacao.map((notificacao) => ({
				id: notificacao.id,
				message: notificacao.mensagem,
				active: notificacao.ativo,
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
export async function countActive(req, res, next) {
	try {
		const { userId } = req.body
		const count = await notificacaoService.countActive(userId)
		res.json({
			count,
		})
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function disableNotificacao(req, res, next) {
	try {
		const { notificacaoId } = req.params
		const notificacao = await notificacaoService.getNotificacaoById(
			Number(notificacaoId)
		)

		// if (notificacao.pedido_id > 0) {
		// 	const pedido = await pedidoService.getPedidoById(
		// 		notificacao.pedido_id
		// 	)

		// 	notificacaoService.createNotificacao(
		// 		pedido.usuario.id,
		// 		`O Pedido do serviço "${pedido.servico.nome}" foi realizado`
		// 	)
		// }
		await notificacaoService.disableNotificacao(Number(notificacaoId))
		res.json(notificacao)
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createNotificacao(req, res, next) {
	try {
		const { usuarioId, mensagem } = req.body
		res.json(
			await notificacaoService.createNotificacao(usuarioId, mensagem)
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
export async function updateNotificacao(req, res, next) {
	try {
		const { id } = req.params
		const { usuarioId, mensagem } = req.body
		res.json(
			await notificacaoService.updateNotificacao(id, usuarioId, mensagem)
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
export async function deleteNotificacao(req, res, next) {
	try {
		const { id } = req.params
		res.json(await notificacaoService.deleteNotificacao(id))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}
