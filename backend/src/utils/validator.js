import { celebrate } from "celebrate"

export const check = (schemaValidator) => (req, res, next) => {
	celebrate(schemaValidator, {
		abortEarly: false,
	})(req, res, next)
}
