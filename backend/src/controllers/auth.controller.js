import httpStatus from 'http-status'
import { AppError } from '../errors/app.error.js'
import * as authService from '../services/auth.service.js'
import jwt from 'jsonwebtoken'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function register(req, res, next) {
	try {
		const { nome, email, senha } = req.body
		await authService.register(nome, email, senha)
		res.sendStatus(httpStatus.CREATED)
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export async function authenticate(req, res, next) {
	try {
		const { email, senha } = req.body
		const user = await authService.authenticate(email, senha)
		if (user) {
			const token = jwt.sign(
				{ userId: user.id, email: user.email },
				process.env.APP_JWT_SECRET
			)

			res.status(httpStatus.OK).json({
				token,
			})
		} else
			res.status(httpStatus.UNAUTHORIZED).json({
				message: 'Usuário ou senha inválidos',
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
export async function me(req, res, next) {
	try {
		const { userId } = req
		const user = await authService.getUserById(userId)

		res.json(user)
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * */
export async function logout(req, res, next) {
	try {
		res.json({ auth: false, token: null })
	} catch (error) {
		next(new AppError(error.message, httpStatus.INTERNAL_SERVER_ERROR))
	}
}
