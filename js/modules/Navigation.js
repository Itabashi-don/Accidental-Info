const Navigation = (() => {
	class Navigation {}

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
			if (!this.selector) return;
			if (!this.matchedElem) throw new ReferenceError(`The selector didn't match with any elements`);

			this.elem.addEventListener("click", () => this.dispatch());
		}

		/**
		 * A function firing when the trigger would be clicked
		 * @abstract
		 */
		dispatch () { throw new Error("dispatch() must be implemented as it's an abstract method") }
	}

	Navigation.Panel = (() => {
		class Panel {
			static get className () { return "navigation_panel" }

			/** @param {HTMLElement} elem */
			constructor (elem) {
				this.elem = elem;
			}

			/** @return {Panel.PanelGroup} */
			get group () { return new Navigation.Panel.PanelGroup(this.elem.parentElement) }

			/** @return {boolean} */
			get open () { return this.elem.hasAttribute("open") }
			/** @param {boolean} val */
			set open (val) { val ? this.elem.setAttribute("open", "") : this.elem.removeAttribute("open") }
		}

		Panel.PanelGroup = class PanelGroup {
			static get className () { return "navigation_panelGroup" }

			/** @param {HTMLElement} elem */
			constructor (elem) {
				this.elem = elem;
			}

			get panels () {
				const panels = this.elem.querySelectorAll(`:scope > .${Navigation.Panel.className}`);
				return Array.from(panels).map(panel => new Navigation.Panel(panel));
			}

			get activePanel () {
				const activePanel = this.elem.querySelector(`:scope > .${Navigation.Panel.className}[Open]`);
				return activePanel ? new Navigation.Panel(activePanel) : null;
			}
		}



		Object.defineProperties(Panel, {
			PanelGroup: { configurable: false, writable: false, enumerable: true }
		});

		return Panel;
	})();

	Navigation.Tab = (() => {
		class Tab extends Navigation.Trigger {
			static get className () { return "navigation_tab" }

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

		Tab.TabBar = class TabBar {
			static get className () { return "navigation_tabBar" }
	
			/** @param {HTMLElement} elem */
			constructor (elem) {
				this.elem = elem;
			}
	
			/** @return {Tab[]} */
			get childTabs () {
				const tabs = this.elem.querySelectorAll(`:scope > .${Navigation.Tab.className}`);
				return Array.from(tabs).map(tab => new Navigation.Tab(tab));
			}
	
			register () {
				for (const childTab of this.childTabs) {
					childTab.register();
				}
			}
		}



		Object.defineProperties(Tab, {
			TabBar: { configurable: false, writable: false, enumerable: true }
		});

		return Tab;
	})()



	Object.defineProperties(Navigation, {
		Trigger: { configurable: false, writable: false, enumerable: true },
		Panel: { configurable: false, writable: false, enumerable: true },
		Tab: { configurable: false, writable: false, enumerable: true }
	});

	return Navigation;
})();



window.addEventListener("DOMContentLoaded", () => {
	const navigation_tabBars = document.getElementsByClassName(Navigation.Tab.TabBar.className);
	for (const tabBar of navigation_tabBars) new Navigation.Tab.TabBar(tabBar).register();

	/*const navigation_tabBar_tabs = document.getElementsByClassName(Navigation.Tab.className);
	for (const tab of navigation_tabBar_tabs) new Navigation.Tab(tab);*/
});