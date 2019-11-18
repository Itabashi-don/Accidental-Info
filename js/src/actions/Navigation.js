import { dispatch } from "./index";
import Navigation from "../components/Navigation";

export const NAVIGATION_TAB_ACTIVE_CHANGE = "NAVIGATION_TAB_ACTIVE_CHANGE";
export const NAVIGATION_PANEL_ACTIVE_CHANGE = "NAVIGATION_PANEL_ACTIVE_CHANGE";



/**
 * @param {Navigation} navigation
 * @param {Navigation.Tab} tab
 */
export function changeTabActive (navigation, tab) {
	return dispatch({
		type: NAVIGATION_TAB_ACTIVE_CHANGE,
		value: { navigation, tab }
	});
}

/**
 * @param {Navigation} navigation
 * @param {Navigation.Panel} panel
 */
export function changePanelActive (navigation, panel) {
	return dispatch({
		type: NAVIGATION_PANEL_ACTIVE_CHANGE,
		value: { navigation, panel }
	});
}