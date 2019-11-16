import { ActionObject } from "../models/Action";

import {
	NAVIGATION_ACTIVE_CHANGE
} from "./Navigation";

import {
	CARD_OPEN,
	CARD_CLOSE
} from "./Card";



/** @param {ActionObject} action */
export function dispatch (action) {
	switch (action.type) {
		case NAVIGATION_ACTIVE_CHANGE:
			action.value.activate();
			break;
		case CARD_OPEN:
			break;
		case CARD_CLOSE:
			break;
	}
}