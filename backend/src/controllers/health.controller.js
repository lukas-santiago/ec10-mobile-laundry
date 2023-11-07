import { logger } from '../config/logger.js'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function healthCheck(req, res, next) {
	try {
		res.status(200).send()
	} catch (error) {
		logger.info(error.message)
		res.status(500).send()
	}
}

export { healthCheck }
