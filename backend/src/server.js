import express from 'express'
import cors from 'cors'
import router from './routes/index.js'
import { logger } from './config/logger.js'
import { loggerMiddleware } from './middleware/logger.middleware.js'
import { errorHandlerMiddleware } from './middleware/error-handler.middleware.js'
import celebrate from 'celebrate'

const APP_PORT = process.env.APP_PORT

const app = express()

app.disable('etag');
app.use(express.json())
app.use(cors())
app.use(loggerMiddleware)
app.use(router)
app.use(celebrate.errors({ statusCode: 400 }))
app.use(errorHandlerMiddleware)

app.listen(APP_PORT, () => {
	logger.info(`Listening on port ${APP_PORT}`)
})
