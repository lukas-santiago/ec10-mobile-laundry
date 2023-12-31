import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as userService from '../services/usuario.service.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function getUser(req, res, next) {
	try {
		const { id } = req.params
		res.json(await userService.getUserById(id))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function listUsers(req, res, next) {
	try {
		res.json(await userService.listUsers())
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function createUser(req, res, next) {
	try {
		const { nome, email, senha } = req.body
		res.json(await userService.createUser(nome, email, senha))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function updateUser(req, res, next) {
	try {
		const { id } = req.params
		const { nome, email, senha } = req.body
		res.json(await userService.updateUser(id, nome, email, senha))
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
export async function deleteUser(req, res, next) {
	try {
		const { id } = req.params
		res.json(await userService.deleteUser(id))
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}
