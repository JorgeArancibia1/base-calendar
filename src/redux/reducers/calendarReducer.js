import { types } from "../types/types";

const initialState = {
	events: [
		{
			title: "Evento",
			notes: "ooooo",
			start: "2022-01-26T21:00:00.098Z",
			end: "2022-01-26T22:00:00.098Z",
			id: 1643227722395,
			user: {
				_id: "123",
				name: "Fernando",
			},
		},
	], // Aqui va la base de lo que se recibe en el payload
	activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};

		case types.eventAddNew:
			return {
				...state,
				events: [...state.events, action.payload],
			};

		default:
			return state;
	}
};
