import { dispatch } from "./index";
import {  } from "../components/Navigation";

export const NAVIGATION_ACTIVE_CHANGE = "NAVIGATION_ACTIVE_CHANGE";



/** @param {Na} */
export function changeActive (navTab) {
	return dispatch({
		type: NAVIGATION_ACTIVE_CHANGE,
		value: navTab
	});
}