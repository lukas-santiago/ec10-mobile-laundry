import { Segments } from 'celebrate'
import Joi from 'joi'

export const NotificacaoValidator = {
	update: {
		[Segments.BODY]: Joi.object({
			id: Joi.number().required(),
			nome: Joi.string().required(),
			descricao: Joi.string().required(),
			preco: Joi.number().required(),
		}),
	},
}
