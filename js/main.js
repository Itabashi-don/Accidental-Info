(() => {
	const navigation_tabBars = document.getElementsByClassName(Navigation.Tab.TabBar.className);
	const cards = document.getElementsByClassName(Card.className);

	for (const tabBar of navigation_tabBars) new Navigation.Tab.TabBar(tabBar).register();
	for (const card of cards) new Card(card).cardTitle.register();
})();