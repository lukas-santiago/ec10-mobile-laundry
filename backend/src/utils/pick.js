/**
 * Cria um objeto composto pelas propriedades do objeto escolhido
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			obj[key] = object[key]
		}
		return obj
	}, {})
}
