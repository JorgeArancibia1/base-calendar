import { types } from "../types/types";
import { moment } from "moment";

const initialState = {
	events: [
		// {
		// 	id: new Date().getTime(),
		// 	title: "Cumpleaños del jefe",
		// 	start: "",
		// 	end: "",
		// 	bgcolor: "#fafafa",
		// 	notes: "Comprar el pastel",
		// 	user: {
		// 		_id: "123",
		// 		name: "Fernando",
		// 	},
		// },
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

		case types.eventClearActiveEvent:
			return {
				...state,
				activeEvent: null,
			};

		default:
			return state;
	}
};
