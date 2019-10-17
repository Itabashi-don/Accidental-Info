const Navigation = (() => {
	class Navigation {}

	Navigation.Panel = class Panel {
		static get className () { return "navigation_panel" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
		}

		/** @return {string} */
		get group () { return this.elem.getAttribute("group") }
		/** @param {string} val */
		set group (val) { this.elem.setAttribute("group", val) }

		/** @return {boolean} */
		get open () { return this.elem.hasAttribute("open") }
		/** @param {boolean} val */
		set open (val) { val ? this.elem.setAttribute("open", "") : this.elem.removeAttribute("open") }
	}

	Navigation.Trigger = class Trigger {
		static get className () { return "navigation-trigger" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
		}

		/** @return {string} */
		get selector () { return this.elem.getAttribute("selector") }
		/** @param {string} val */
		set selector (val) { this.elem.setAttribute("selector", val) }

		/** @return {HTMLElement | null} */
		get matchedElem () { return this.selector ? document.querySelector(this.selector) : null }

		register () {
			if (!this.selector) throw new TypeError(`"selector" can't be blank`);
			if (!this.matchedElem) throw new ReferenceError(`The selector didn't match with any elements`);

			this.elem.addEventListener("click", () => this.dispatch());
		}

		/**
		 * A function firing when the trigger would be clicked
		 * @abstract
		 */
		dispatch () { throw new Error("dispatch() must be implemented as it's an abstract method") }
	}

	Navigation.TabBar = (() => {
		class TabBar {
			static get className () { return "navigation_tabBar" }

			/** @param {HTMLElement} elem */
			constructor (elem) {
				this.elem = elem;
			}

			/** @return {TabBar.Tab[]} */
			get childTabs () {
				const tabs = this.elem.querySelectorAll(`:scope > .${Navigation.TabBar.Tab.className}`);
				return Array.from(tabs).map(tab => new Navigation.TabBar.Tab(tab));
			}

			register () {
				for (const childTab of this.childTabs) {
					childTab.register();
				}
			}
		}

		TabBar.Tab = class Tab extends Navigation.Trigger {
			static get className () { return "navigation_tabBar_tab" }

			/** @param {HTMLElement} elem */
			constructor (elem) {
				super(elem);
			}
			
			/** @return {boolean} */
			get disabled () { return this.elem.hasAttribute("disabled") }
			/** @param {boolean} val */
			set disabled (val) { val ? this.elem.setAttribute("disabled", "") : this.elem.removeAttribute("disabled") }

			dispatch () {
				if (!this.disabled) this.matchedElem.setAttribute("open", "");
			}
		}

		Object.defineProperties(TabBar, {
			Tab: { configurable: false, writable: false, enumerable: true }
		});

		

		return TabBar;
	})();

	Object.defineProperties(Navigation, {
		Panel: { configurable: false, writable: false, enumerable: true },
		Trigger: { configurable: false, writable: false, enumerable: true },
		TabBar: { configurable: false, writable: false, enumerable: true }
	});



	return Navigation;
})();



window.addEventListener("DOMContentLoaded", () => {
	const navigation_tabBars = document.getElementsByClassName(Navigation.TabBar.className);
	for (const tabBar of navigation_tabBars) new Navigation.TabBar(tabBar).register();

	/*const navigation_tabBar_tabs = document.getElementsByClassName(Navigation.TabBar.Tab.className);
	for (const tab of navigation_tabBar_tabs) new Navigation.TabBar.Tab(tab);*/
});