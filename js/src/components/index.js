import Navigation from "./Navigation";
import Card from "./Card";



export function initComponents () {
	const navigations = document.getElementsByClassName(Navigation.className);
	const cards = document.getElementsByClassName(Card.className);

	for (const nav of navigations) new Navigation(nav).register();
	for (const card of cards) new Card(card).cardTitle.register();
}