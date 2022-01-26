import { types } from "../types/types";

const initialState = {
	events: [], // Aqui va la base de lo que se recibe en el payload
	activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};

		default:
			return state;
	}
};
