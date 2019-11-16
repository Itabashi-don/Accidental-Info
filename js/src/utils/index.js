import I18n from "./I18n";



const Util = (() => {
	class Util {
		/**
		 * Returns a class type of provided object
		 * @param {any} obj
		 */
		static getClass (obj) { return Object.prototype.toString.call(obj).slice(8, -1) }
	}

	Util.I18n = I18n;



	Object.defineProperties(Util, {
		I18n: { configurable: false, writable: false, enumerable: true }
	});

	return Util;
})();



export default Util;