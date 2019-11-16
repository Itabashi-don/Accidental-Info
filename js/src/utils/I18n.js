export default class I18n {
	static get lang () { return navigator.language }
	
	static init () { document.documentElement.lang = I18n.lang }
}