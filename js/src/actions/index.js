import { ActionObject } from "../models/Action";

import {
	NAVIGATION_TAB_ACTIVE_CHANGE,
	NAVIGATION_PANEL_ACTIVE_CHANGE
} from "./Navigation";

import {
	CARD_OPEN,
	CARD_CLOSE
} from "./Card";



/** @param {ActionObject} action */
export function dispatch (action) {
	switch (action.type) {
		case NAVIGATION_TAB_ACTIVE_CHANGE:
			(() => {
				const { navigation, tab } = action.value;

				for (const tab of navigation.childTabs) tab.active = false;
				tab.active = true;

				// ToDo: オートスクロール機能
			})(); break;
		case NAVIGATION_PANEL_ACTIVE_CHANGE:
			(() => {
				const { navigation, panel } = action.value;

				const matchedPanel = panel.group.panels.find(child => child.id === panel.id);

				if (matchedPanel && !matchedPanel.active) {
					for (const child of panel.group.panels) child.active = false;
					matchedPanel.active = true;
				}
			})(); break;
		case CARD_OPEN:
			action.value.open = true;
			break;
		case CARD_CLOSE:
			action.value.open = false;
			break;
	}
}