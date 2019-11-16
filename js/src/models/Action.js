export default class Action {
	/**
	 * Returns whether a provided object is Action
	 * @param {ActionObject} actionableObj
	 */
	static validate (actionableObj) {
		if (Util.getClass(actionableObj) !== "Object") return false;

		for (const prop of ["type", "value"]) {
			if (!Object.keys(actionableObj).includes(prop)) return false;
		}

		return true;
	}
}



/**
 * @typedef {object} ActionObject
 * @prop {string} type
 * @prop {object} value
 */
void(0);