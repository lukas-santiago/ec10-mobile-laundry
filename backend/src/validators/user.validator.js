import { Segments } from 'celebrate'
import Joi from 'joi'

export const UserValidator = {
	create: {
		[Segments.BODY]: Joi.object({
			nome: Joi.string().required(),
			email: Joi.string().required().email(),
			senha: Joi.string().required(),
		}),
	},
	update: {
		[Segments.BODY]: Joi.object({
			nome: Joi.string().required(),
			email: Joi.string().required().email(),
			senha: Joi.string().required(),
		}),
	},
}
