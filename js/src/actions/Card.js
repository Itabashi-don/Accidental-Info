import { dispatch } from "./index";

export const CARD_OPEN = "CARD_OPEN";
export const CARD_CLOSE = "CARD_CLOSE";



export function openCard (card) {
	return dispatch({
		type: CARD_OPEN,
		value: card
	});
}

export function closeCard (card) {
	return dispatch({
		type: CARD_CLOSE,
		value: card
	});
}