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
				nome: servico.nome,
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
		const { nome, descricao } = req.body
		res.json(await serviceService.createServico(nome, descricao))
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
		const { nome, descricao } = req.body
		res.json(await serviceService.updateServico(id, nome, descricao))
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
