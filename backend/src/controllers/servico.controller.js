import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as serviceService from '../services/servico.service.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getService(req, res) {
	try {
		const { id } = req.params
		res.json(await serviceService.getServiceById(id))
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function listServices(req, res) {
	try {
		res.json(await serviceService.listServices())
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createService(req, res) {
	try {
		const { nome, descricao } = req.body
		res.json(await serviceService.createService(nome, descricao))
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function updateService(req, res) {
	try {
		const { id } = req.params
		const { nome, descricao } = req.body
		res.json(await serviceService.updateService(id, nome, descricao))
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
export async function deleteService(req, res) {
	try {
		const { id } = req.params
		res.json(await serviceService.deleteService(id))
	} catch (error) {
		throw new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
	}
}