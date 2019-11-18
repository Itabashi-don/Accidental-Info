import {
	changeTabActive,
	changePanelActive
} from "../actions/Navigation";



const Navigation = (() => {
	class Navigation {
		static get className () { return "navigation" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
			this.register();
		}

		/** @return {Navigation.Tab[]} */
		get childTabs () {
			const tabs = this.elem.querySelectorAll(`:scope > .${Navigation.Tab.className}`);
			return Array.from(tabs).map(tab => new Navigation.Tab(tab));
		}

		register () {
			for (const childTab of this.childTabs) childTab.register(this);
		}
	}



	Navigation.Trigger = class Trigger {
		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
		}

		/** @return {string} */
		get selector () { return this.elem.getAttribute("selector") }
		/** @param {string} val */
		set selector (val) { this.elem.setAttribute("selector", val) }

		/** @return {HTMLElement | null} */
		get matched () { return this.selector ? document.querySelector(this.selector) : null }

		register () {
			if (!this.selector) return;
			if (!this.matched) throw new ReferenceError(`The selector didn't match with any elements`);

			this.elem.addEventListener("click", () => this.handleClick());
		}

		/**
		 * A function fired when it would be clicked
		 * @abstract
		 */
		handleClick () { throw new Error("handleClick() must be implemented as it's an abstract method") }
	};

	Navigation.Tab = (() => {
		class Tab extends Navigation.Trigger {
			static get className () { return "navigation_tab" }

			/** @param {HTMLElement} elem */
			constructor (elem) {
				super(elem);
			}

			/** @param {Navigation.Panel | null} */
			get matched () { return new Navigation.Panel(super.matched) }

			/** @return {boolean} */
			get active () { return this.elem.hasAttribute(Tab.ATTRS.ACTIVE) }
			/** @param {boolean} val */
			set active (val) { val ? this.elem.setAttribute(Tab.ATTRS.ACTIVE, "") : this.elem.removeAttribute(Tab.ATTRS.ACTIVE) }
			
			/** @return {boolean} */
			get disabled () { return this.elem.hasAttribute(Tab.ATTRS.DISABLED) }
			/** @param {boolean} val */
			set disabled (val) { val ? this.elem.setAttribute(Tab.ATTRS.DISABLED, "") : this.elem.removeAttribute(Tab.ATTRS.DISABLED) }

			/** @param {Navigation} navigation */
			register (navigation) {
				if (!this.selector) return;
				if (!this.matched) throw new ReferenceError(`The selector didn't match with any elements`);

				this.elem.addEventListener("click", () => this.handleActive(navigation));
			}

			/** @param {Navigation} navigation */
			handleActive (navigation) {
				if (!this.disabled && !this.active) {
					changeTabActive(navigation, this);
					changePanelActive(navigation, this.matched);
				}
			}
		}

		Tab.CLASSES = {};

		Tab.ATTRS = {
			ACTIVE: "active",
			DISABLED: "disabled"
		};



		Object.defineProperties(Tab, {
			CLASSES: { configurable: false, writable: false, enumerable: true },
			ATTRS: { configurable: false, writable: false, enumerable: true }
		});

		return Tab;
	})();

	Navigation.Panel = (() => {
		class Panel {
			static get className () { return "navigation_panel" }

			/** @param {HTMLElement} elem */
			constructor (elem) {
				this.elem = elem;
			}

			/** @return {string} */
			get id () { return this.elem.id }

			/** @return {Panel.PanelGroup} */
			get group () { return new Navigation.Panel.PanelGroup(this.elem.parentElement) }

			/** @return {boolean} */
			get active () { return this.elem.hasAttribute(Panel.ATTRS.ACTIVE) }
			/** @param {boolean} val */
			set active (val) { val ? this.elem.setAttribute(Panel.ATTRS.ACTIVE, "") : this.elem.removeAttribute(Panel.ATTRS.ACTIVE) }
		}

		Panel.CLASSES = {};

		Panel.ATTRS = {
			ACTIVE: "active"
		};



		Panel.PanelGroup = class PanelGroup {
			static get className () { return "navigation_panelGroup" }

			/** @param {HTMLElement} elem */
			constructor (elem) {
				this.elem = elem;
			}

			/** @return {Panel[]} */
			get panels () {
				const panels = this.elem.querySelectorAll(`:scope > .${Panel.className}`);
				return Array.from(panels).map(panel => new Panel(panel));
			}

			/** @return {Panel | null} */
			get activePanel () { return this.panels.find(panel => panel.active) }
		};



		Object.defineProperties(Panel, {
			CLASSES: { configurable: false, writable: false, enumerable: true },
			ATTRS: { configurable: false, writable: false, enumerable: true },

			PanelGroup: { configurable: false, writable: false, enumerable: true }
		});

		return Panel;
	})();



	Object.defineProperties(Navigation, {
		Trigger: { configurable: false, writable: false, enumerable: true },
		Tab: { configurable: false, writable: false, enumerable: true },
		Panel: { configurable: false, writable: false, enumerable: true }
	});

	return Navigation;
})();



export default Navigation;