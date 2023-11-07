import jwt from 'jsonwebtoken'
import { logger } from '../config/logger.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * */
export const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization

	logger.info('auth.middleware.js', authHeader)
	if (!authHeader) {
		res.sendStatus(401).end()
	}

	const [, token] = authHeader.split(' ')

	try {
		const decoded = jwt.verify(token, process.env.APP_JWT_SECRET)
		req.userId = decoded.userId
	} catch (error) {
		res.status(401).end()
	}

	next()
}
