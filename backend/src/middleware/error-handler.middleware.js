import { logger } from '../config/logger.js'

/**
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @return {void}
 */
export function errorHandlerMiddleware(err, req, res, next) {
	logger.error(err.message)

	const errorStatus = err.statusCode || 500
	const errorMessage = err.message || 'Something went wrong'

	res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: process.env.NODE_ENV === 'development' ? err.stack : {},
	})

	next()
}
