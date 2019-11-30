import Navigation from "./Navigation";
import Card from "./Card";



abstract class Component {
	static readonly className: string;

	constructor (public elem: Element) {}
}



export default Component;

export function initComponents (): void {
	const navigations = document.getElementsByClassName(Navigation.className);
	const cards = document.getElementsByClassName(Card.className);

	for (const nav of navigations) new Navigation(nav);
	for (const card of cards) new Card(card);
}