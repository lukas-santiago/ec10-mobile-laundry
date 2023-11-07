import { Segments } from 'celebrate'
import Joi from 'joi'

export const TenantValidator = {
	create: {
		[Segments.BODY]: Joi.object({
			tenantName: Joi.string()
				.required()
				.regex(/^([a-z_])\w+$/),
		}),
	},
}
