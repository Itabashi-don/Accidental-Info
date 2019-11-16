const Card = (() => {
	class Card {
		static get className () { return "card" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
		}

		/** @return {Card.CardTitle} */
		get cardTitle () { return new Card.CardTitle(this.elem.querySelector(`:scope > .${Card.CardTitle.className}`)) }

		/** @return {Card.CardContent} */
		get cardContent () { return new Card.CardContent(this.elem.querySelector(`:scope > .${Card.CardContent.className}`)) }

		/** @return {boolean} */
		get open () { return this.elem.hasAttribute(Card.ATTRS.OPEN) }
		/** @param {boolean} val */
		set open (val) { val ? this.elem.setAttribute(Card.ATTRS.OPEN, "") : this.elem.removeAttribute(Card.ATTRS.OPEN) }
	}

	Card.CLASSES = {};

	Card.ATTRS = {
		OPEN: "open"
	};

	Card.ACTIONS = {
		CARD_OPEN: "CARD_OPEN_CHANGE"
	};



	Card.CardTitle = class CardTitle {
		static get className () { return "card_title" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
		}

		get card () { return new Card(this.elem.parentElement) }

		register () {
			this.elem.addEventListener("click", () => this.dispatch());
		}

		dispatch () {
			this.card.open = !this.card.open;
		}
	};

	Card.CardContent = class CardContent {
		static get className () { return "card_content" }

		/** @param {HTMLElement} elem */
		constructor (elem) {
			this.elem = elem;
		}

		get card () { return new Card(this.elem.parentElement) }
	};



	Object.defineProperties(Card, {
		CLASSES: { configurable: false, writable: false, enumerable: true },
		ATTRS: { configurable: false, writable: false, enumerable: true },

		CardTitle: { configurable: false, writable: false, enumerable: true },
		CardContent: { configurable: false, writable: false, enumerable: true }
	});

	return Card;
})();