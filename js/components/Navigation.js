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
		get matched () { return this.selector ? document.querySelector(this.selector) : null }

		register () {
			if (!this.selector) return;
			if (!this.matched) throw new ReferenceError(`The selector didn't match with any elements`);

			this.elem.addEventListener("click", () => this.dispatch());
		}

		/**
		 * A function firing when the trigger would be clicked
		 * @abstract
		 */
		dispatch () { throw new Error("dispatch() must be implemented as it's an abstract method") }
	};

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
			get active () { return this.elem.hasAttribute(Panel.stateAttrs.active) }
			/** @param {boolean} val */
			set active (val) { val ? this.elem.setAttribute(Panel.stateAttrs.active, "") : this.elem.removeAttribute(Panel.stateAttrs.active) }
		}

		Panel.stateClasses = {};

		Panel.stateAttrs = {
			active: "active"
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
			
			/** @param {Panel} panel */
			activate (panel) {
				const matchedPanel = this.panels.find(child => child.id === panel.id);

				if (matchedPanel && !matchedPanel.active) {
					for (const child of this.panels) child.active = false;
					matchedPanel.active = true;
				}
			}
		};



		Object.defineProperties(Panel, {
			stateClasses: { configurable: false, writable: false, enumerable: true },
			stateAttrs: { configurable: false, writable: false, enumerable: true },

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

			/** @param {Navigation.Panel | null} */
			get matched () { return new Navigation.Panel(super.matched) }

			/** @return {Tab.TabBar} */
			get tabBar () { return new Tab.TabBar(this.elem.parentElement) }

			/** @return {boolean} */
			get active () { return this.elem.hasAttribute(Tab.stateAttrs.active) }
			/** @param {boolean} val */
			set active (val) { val ? this.elem.setAttribute(Tab.stateAttrs.active, "") : this.elem.removeAttribute(Tab.stateAttrs.active) }
			
			/** @return {boolean} */
			get disabled () { return this.elem.classList.contains(Tab.stateClasses.disabled) }
			/** @param {boolean} val */
			set disabled (val) { val ? this.elem.classList.add(Tab.stateClasses.disabled) : this.elem.classList.remove(Tab.stateClasses.disabled) }

			activate () {
				if (this.active) return;

				for (const tab of this.tabBar.childTabs) tab.active = false;
				this.active = true;
			}

			dispatch () {
				if (!this.disabled) {
					this.activate();
					this.matched.group.activate(this.matched);
				}
			}
		}

		Tab.stateClasses = {};

		Tab.stateAttrs = {
			active: "active",
			disabled: "disabled"
		};



		Tab.TabBar = class TabBar {
			static get className () { return "navigation" }
	
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
		};



		Object.defineProperties(Tab, {
			stateClasses: { configurable: false, writable: false, enumerable: true },
			stateAttrs: { configurable: false, writable: false, enumerable: true },

			TabBar: { configurable: false, writable: false, enumerable: true }
		});

		return Tab;
	})();



	Object.defineProperties(Navigation, {
		Trigger: { configurable: false, writable: false, enumerable: true },
		Panel: { configurable: false, writable: false, enumerable: true },
		Tab: { configurable: false, writable: false, enumerable: true }
	});

	return Navigation;
})();