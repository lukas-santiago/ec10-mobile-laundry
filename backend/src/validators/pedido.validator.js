import { Segments } from 'celebrate'
import Joi from 'joi'

export const PedidoValidator = {
	create: {
		[Segments.BODY]: Joi.object({
			clienteId: Joi.number().required(),
			servicoId: Joi.number().required(),
		}),
	},
	update: {
		[Segments.BODY]: Joi.object({
			status: Joi.string().required(),
		}),
	},
}
