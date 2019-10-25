(() => {
	const navigation_tabBars = document.getElementsByClassName(Navigation.Tab.TabBar.className);
	for (const tabBar of navigation_tabBars) new Navigation.Tab.TabBar(tabBar).register();

	/*const weatherPanel = document.getElementById("info-panels_panel--weather");

	for (const windyFrame of weatherPanel.querySelectorAll("details iframe[src*='windy.com']")) {
		windyFrame.addEventListener("load", () => setTimeout(() => windyFrame.parentElement.parentElement.removeAttribute("open"), 2000));
	}*/
})();