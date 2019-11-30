import Component from "./index";

import {
	openCard,
	closeCard,
} from "../actions/Card";



class Card extends Component {
	static readonly className = "card";

	
	constructor (elem: Element) {
		super(elem);
		this.register();
	}

	get open (): boolean { return this.elem.hasAttribute(Card.ATTRS.OPEN) }
	set open (val: boolean) { val ? this.elem.setAttribute(Card.ATTRS.OPEN, "") : this.elem.removeAttribute(Card.ATTRS.OPEN) }

	get cardTitle (): Card.CardTitle { return new Card.CardTitle(this.elem.querySelector(`:scope > .${Card.CardTitle.className}`)) }
	get cardContent (): Card.CardContent { return new Card.CardContent(this.elem.querySelector(`:scope > .${Card.CardContent.className}`)) }

	public register (): void { this.cardTitle.elem.addEventListener("click", () => this.handleOpen()) }


	private handleOpen (): void { !this.open ? openCard(this) : closeCard(this) }
}

namespace Card {
	export const CLASSES = {};
	export const ATTRS = { OPEN: "open" };

	

	// ========== CardTitle ==========

	export class CardTitle extends Component {
		static readonly className = "card_title";

		constructor (elem: Element) { super(elem) }
	}

	export namespace CardTitle {
		export const CLASSES = {};
		export const ATTRS = {};
	}


	// ========== CardContent ==========

	export class CardContent extends Component {
		static readonly className = "card_content";

		constructor (elem: Element) { super(elem) }
	}

	export namespace CardContent {
		export const CLASSES = {};
		export const ATTRS = {};
	}
}



export default Card;