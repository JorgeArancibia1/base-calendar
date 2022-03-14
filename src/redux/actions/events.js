import { fetchConToken } from '../../helpers/fetch';
import { types } from '../types/types';

export const eventStartAddNew = (event) => {
	return async (dispatch, getState) => {
		// getState es para leer el estado de Redux
		const { uid, name } = getState().auth;
		try {
			const resp = await fetchConToken('events', event, 'POST');
			const body = await resp.json();

			if (body.ok) {
				event.id = body.evento.id;
				event.user = {
					_id: uid,
					name,
				};
				dispatch(eventAddNew(event));
			}
		} catch (error) {}
	};
};

const eventAddNew = (event) => ({
	type: types.eventAddNew,
	payload: event,
});

export const eventSetActive = (event) => ({
	type: types.eventSetActive,
	payload: event,
});

export const eventClearActiveEvent = () => ({
	type: types.eventClearActiveEvent,
});

export const eventDeleted = () => ({
	type: types.eventDeleted,
});

export const eventUpdated = (event) => ({
	type: types.eventUpdated,
	payload: event,
});
