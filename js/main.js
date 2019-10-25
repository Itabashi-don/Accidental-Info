(() => {
	const infoPanels = document.getElementById("info-panels");
	const weatherPanel = document.getElementById("info-panels_panel--weather");

	for (const windyFrame of weatherPanel.querySelectorAll("details iframe[src*='windy.com']")) {
		// windyFrame.addEventListener("load", () => setTimeout(() => windyFrame.parentElement.parentElement.removeAttribute("open"), 2000));
	}
})();