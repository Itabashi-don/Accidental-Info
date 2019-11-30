import { Action, dispatch } from ".";
import Navigation from "../components/Navigation";



export const NAVIGATION_TAB_ACTIVE_CHANGE = "NAVIGATION_TAB_ACTIVE_CHANGE";
export const NAVIGATION_PANEL_ACTIVE_CHANGE = "NAVIGATION_PANEL_ACTIVE_CHANGE";

export interface NavigationAction extends Action {
	value: {
		navigation?: Navigation;
		tab?: Navigation.Tab;
		panel?: Navigation.Panel;
	};
}



export function changeTabActive (navigation: Navigation, tab: Navigation.Tab): void {
	return dispatch({
		type: NAVIGATION_TAB_ACTIVE_CHANGE,
		value: { navigation, tab }
	});
}

export function changePanelActive (navigation: Navigation, panel: Navigation.Panel): void {
	return dispatch({
		type: NAVIGATION_PANEL_ACTIVE_CHANGE,
		value: { navigation, panel }
	});
}