import { openCard, closeCard } from "../actions/Card";



const Card = (() => {
	class Card {
		static get className () { return "card" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
			this.register();
		}

		/** @return {Card.CardTitle} */
		get cardTitle () { return new Card.CardTitle(this.elem.querySelector(`:scope > .${Card.CardTitle.className}`)) }

		/** @return {Card.CardContent} */
		get cardContent () { return new Card.CardContent(this.elem.querySelector(`:scope > .${Card.CardContent.className}`)) }

		/** @return {boolean} */
		get open () { return this.elem.hasAttribute(Card.ATTRS.OPEN) }
		/** @param {boolean} val */
		set open (val) { val ? this.elem.setAttribute(Card.ATTRS.OPEN, "") : this.elem.removeAttribute(Card.ATTRS.OPEN) }

		register () {
			this.cardTitle.elem.addEventListener("click", () => this.handleOpen());
		}

		handleOpen () {
			!this.open ? openCard(this) : closeCard(this);
		}
	}

	Card.CLASSES = {};

	Card.ATTRS = {
		OPEN: "open"
	};



	Card.CardTitle = class CardTitle {
		static get className () { return "card_title" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
		}
	};

	Card.CardContent = class CardContent {
		static get className () { return "card_content" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
		}
	};



	Object.defineProperties(Card, {
		CLASSES: { configurable: false, writable: false, enumerable: true },
		ATTRS: { configurable: false, writable: false, enumerable: true },

		CardTitle: { configurable: false, writable: false, enumerable: true },
		CardContent: { configurable: false, writable: false, enumerable: true }
	});

	return Card;
})();



export default Card;