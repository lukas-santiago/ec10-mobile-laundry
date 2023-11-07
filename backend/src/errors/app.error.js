import httpStatus from 'http-status'
import { logger } from '../config/logger.js'

export class AppError extends Error {
	constructor(message, statusCode) {
		super(message)
		logger.error(message)
		this.statusCode = statusCode
		this.status = httpStatus[statusCode] || httpStatus.INTERNAL_SERVER_ERROR
		Error.captureStackTrace(this, this.constructor)
	}
}
