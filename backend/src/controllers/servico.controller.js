import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as serviceService from '../services/servico.service.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getService(req, res, next) {
	try {
		const { id } = req.params
		res.json(await serviceService.getServicoById(Number(id)))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function listServices(req, res, next) {
	try {
		const servicos = await serviceService.listServicos()
		res.json(
			servicos.map((servico) => ({
				id: servico.id,
				name: servico.nome,
				description: servico.descricao,
				price: servico.preco,
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
export async function createService(req, res, next) {
	try {
		const { name, description, price } = req.body
		res.json(await serviceService.createServico(name, description, price))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function updateService(req, res, next) {
	try {
		const { id } = req.params
		const { name, description, price } = req.body
		res.json(
			await serviceService.updateServico(Number(id), name, description, price)
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
export async function deleteService(req, res, next) {
	try {
		const { id } = req.params
		res.json(await serviceService.deleteServico(id))
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
export async function disableServico(req, res, next) {
	try {
		const { id } = req.params
		res.json(await serviceService.disableServico(Number(id)))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}
