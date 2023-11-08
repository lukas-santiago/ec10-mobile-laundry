import { Segments } from 'celebrate'
import Joi from 'joi'

export const ServicoValidator = {
	create: {
		[Segments.BODY]: Joi.object({
			name: Joi.string().required(),
			description: Joi.string().required(),
			price: Joi.number().required(),
		}),
	},
	update: {
		[Segments.BODY]: Joi.object({
			name: Joi.string().required(),
			description: Joi.string().required(),
			price: Joi.number().required(),
		}),
	},
}
