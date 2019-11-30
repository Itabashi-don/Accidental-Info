import {
	NavigationAction,

	NAVIGATION_TAB_ACTIVE_CHANGE,
	NAVIGATION_PANEL_ACTIVE_CHANGE,
} from "./Navigation";

import {
	CardAction,

	CARD_OPEN,
	CARD_CLOSE,
} from "./Card";



export interface Action {
	type: string;
	value: any;
}





export function dispatch (action: Action): void {
	switch (action.type) {
		case NAVIGATION_TAB_ACTIVE_CHANGE:
			((): void => {
				const { navigation, tab } = (action as NavigationAction).value;

				if (tab && !tab.active) {
					for (const child of navigation.tabs) child.active = false;
					tab.active = true;

					// ToDo: オートスクロール機能
				}
			})(); break;
		case NAVIGATION_PANEL_ACTIVE_CHANGE:
			((): void => {
				const { panel } = (action as NavigationAction).value;

				if (panel && !panel.active) {
					for (const child of panel.group.panels) child.active = false;
					panel.active = true;
				}
			})(); break;
		case CARD_OPEN:
			(action as CardAction).value.open = true;
			break;
		case CARD_CLOSE:
			(action as CardAction).value.open = false;
			break;
	}
}