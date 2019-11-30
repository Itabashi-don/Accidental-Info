class Util {
	/** Returns a class type of provided object */
	public static getClass (obj: any): string { return Object.prototype.toString.call(obj).slice(8, -1) }
}

namespace Util {}



export default Util;