import { Action, dispatch } from ".";
import Card from "../components/Card";



export const CARD_OPEN = "CARD_OPEN";
export const CARD_CLOSE = "CARD_CLOSE";

export interface CardAction extends Action {
	value: Card;
}



export function openCard (card: Card): void {
	return dispatch({
		type: CARD_OPEN,
		value: card
	});
}

export function closeCard (card: Card): void {
	return dispatch({
		type: CARD_CLOSE,
		value: card
	});
}