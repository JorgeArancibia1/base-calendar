import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
	// Se retorna otra función al ser una tarea asincrona.
	return async (dispatch) => {
		// El thunk proporciona el dispatch
		const resp = await fetchSinToken('auth', { email, password }, 'POST'); // api/auth -> data -> con metodo post
		const body = await resp.json(); /// Devuelve el 'name','ok', 'token', 'uid'

		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime()); //Tiene 2 horas para que viva el token, graba fecha, minuto, hora y segundo.
			console.log(body);
			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			Swal.fire('Error', body.msg, 'error');
		}
	};
};

export const startRegister = (email, password, name) => {
	return async (dispatch) => {
		const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST'); // api/auth -> data -> con metodo post
		const body = await resp.json(); /// Si esta ok devuelve el 'name','ok', 'token', 'uid'
		console.log(body);
		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime()); //Tiene 2 horas para que viva el token, graba fecha, minuto, hora y segundo.
			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			Swal.fire('Error', body.msg, 'error');
		}
	};
};

export const startChecking = () => {
	return async (dispatch) => {
		const resp = await fetchConToken('auth/renew'); // api/auth -> data -> con metodo post
		const body = await resp.json(); /// Si esta ok devuelve el 'name','ok', 'token', 'uid'
		if (body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('token-init-date', new Date().getTime()); //Tiene 2 horas para que viva el token, graba fecha, minuto, hora y segundo.
			dispatch(
				login({
					uid: body.uid,
					name: body.name,
				})
			);
		} else {
			// Swal.fire('Error', body.msg, 'error');
			dispatch(checkingFinish());
		}
	};
};

const checkingFinish = () => ({
	type: types.authCheckingFinish,
});

const login = (user) => ({
	type: types.authLogin,
	payload: user,
});
