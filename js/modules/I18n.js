class I18n {
	static get lang () { return navigator.language }

	static register () { document.documentElement.lang = I18n.lang }
}



window.addEventListener("DOMContentLoaded", () => I18n.register());