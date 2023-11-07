import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as pedidoService from '../services/pedido.service.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getPedido(req, res) {
	try {
		const { id } = req.params
		res.json(await pedidoService.getPedidoById(id))
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function listPedidos(req, res) {
	try {
		res.json(await pedidoService.listPedidos())
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createPedido(req, res) {
	try {
		const { clienteId, produtoId } = req.body
		res.json(await pedidoService.createPedido(clienteId, produtoId))
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function updatePedido(req, res) {
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
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @return {void}
 * */
export async function deletePedido(req, res) {
	try {
		const { id } = req.params
		res.json(await pedidoService.deletePedido(id))
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}
