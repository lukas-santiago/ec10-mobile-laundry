import morgan from 'morgan'
import { logger } from '../config/logger.js'

export const loggerMiddleware = morgan(
	':remote-addr :method :url :status :res[content-length] - :response-time ms',
	{
		stream: {
			write: (message) => logger.http(message.trim()),
		},
	}
)
