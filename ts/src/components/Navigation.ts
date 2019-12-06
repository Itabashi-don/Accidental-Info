import Component from "./Component";

import {
	changeTabActive,
	changePanelActive,
} from "../actions/Navigation";



export class Navigation extends Component {
	static readonly className = "navigation";


	constructor (elem: Element) {
		super(elem);
		this.register();
	}

	get tabs (): Navigation.Tab[] {
		const tabs = this.elem.querySelectorAll(`:scope > .${Navigation.Tab.className}`);
		return Array.from(tabs).map(tab => new Navigation.Tab(tab));
	}

	public register (): void {
		for (const childTab of this.tabs) childTab.register(this);
	}
}

export namespace Navigation {
	export const CLASSES = {};
	export const ATTRS = {};



	// ========== Trigger ==========

	export abstract class Trigger extends Component {
		constructor (elem: Element) { super(elem) }

		get selector (): string { return this.elem.getAttribute("selector") }
		set selector (val: string) { this.elem.setAttribute("selector", val) }

		get matched (): Element | any | null { return this.selector ? document.querySelector(this.selector) : null }

		public register (): void {
			if (!this.available) return;
			this.elem.addEventListener("click", () => this.handleClick());
		}


		/** A function fired when it would be clicked */
		protected abstract handleClick (): void;
		
		protected get available (): boolean { return Boolean(this.selector && this.matched) }
	}


	// ========== Tab ==========

	export class Tab extends Trigger {
		static readonly className = "navigation_tab";


		constructor (elem: Element) { super(elem) }

		get active (): boolean { return this.elem.hasAttribute(Tab.ATTRS.ACTIVE) }
		set active (val: boolean) { val ? this.elem.setAttribute(Tab.ATTRS.ACTIVE, "") : this.elem.removeAttribute(Tab.ATTRS.ACTIVE) }

		get disabled (): boolean { return this.elem.hasAttribute(Tab.ATTRS.DISABLED) }
		set disabled (val: boolean) { val ? this.elem.setAttribute(Tab.ATTRS.DISABLED, "") : this.elem.removeAttribute(Tab.ATTRS.DISABLED) }

		get matched (): Panel { return new Navigation.Panel(super.matched) }

		public register (navigation?: Navigation): void {
			if (!this.available) return;
			this.elem.addEventListener("click", () => this.handleClick(navigation));
		}


		protected handleClick (navigation?: Navigation): void {
			if (!this.disabled && !this.active) {
				changeTabActive(navigation, this);
				changePanelActive(navigation, this.matched);
			}
		}
	}

	export namespace Tab {
		export const CLASSES = {};
		export const ATTRS = {
			ACTIVE: "active",
			DISABLED: "disabled"
		};
	}


	// ========== Panel ==========

	export class Panel extends Component {
		static readonly className = "navigation_panel";


		constructor (elem: Element) { super(elem) }

		get id (): string { return this.elem.id }
		get group (): Panel.PanelGroup { return new Navigation.Panel.PanelGroup(this.elem.parentElement) }

		get active (): boolean { return this.elem.hasAttribute(Panel.ATTRS.ACTIVE) }
		set active (val: boolean) { val ? this.elem.setAttribute(Panel.ATTRS.ACTIVE, "") : this.elem.removeAttribute(Panel.ATTRS.ACTIVE) }
	}

	export namespace Panel {
		export const CLASSES = {};
		export const ATTRS = { ACTIVE: "active" };



		// ========== PanelGroup ==========

		export class PanelGroup extends Component {
			static readonly className = "navigation_panelGroup";


			constructor (elem: Element) { super(elem) }

			get panels (): Panel[] {
				const panels = this.elem.querySelectorAll(`:scope > .${Panel.className}`);
				return Array.from(panels).map(panel => new Panel(panel));
			}

			get activePanel (): Panel | null { return this.panels.find(panel => panel.active) }
		}

		export namespace PanelGroup {
			export const CLASSES = {};
			export const ATTRS = {};
		}
	}
}



export default Navigation;