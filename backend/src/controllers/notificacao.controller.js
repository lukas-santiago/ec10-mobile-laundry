import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as notificacaoService from '../services/notificacao.service.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getNotificacao(req, res) {
	try {
		const { id } = req.params
		res.json(await notificacaoService.getNotificacaoById(id))
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function listNotificacoes(req, res) {
	try {
		res.json(await notificacaoService.listNotificacoes())
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createNotificacao(req, res) {
	try {
		const { usuarioId, mensagem } = req.body
		res.json(
			await notificacaoService.createNotificacao(usuarioId, mensagem)
		)
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function updateNotificacao(req, res) {
	try {
		const { id } = req.params
		const { usuarioId, mensagem } = req.body
		res.json(
			await notificacaoService.updateNotificacao(id, usuarioId, mensagem)
		)
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @return {void}
 * */
export async function deleteNotificacao(req, res) {
	try {
		const { id } = req.params
		res.json(await notificacaoService.deleteNotificacao(id))
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}