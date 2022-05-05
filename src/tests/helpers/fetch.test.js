import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch', () => {

	let token = '';

	test('Fetch sin token debería funcionar', async () => {
		const resp = await fetchSinToken(
			'auth',
			{
				email: 'jeal@gmail.com',
				password: '1234567',
			},
			'POST'
		);

		expect(resp instanceof Response).toBe(true);

		const body = await resp.json();
		expect(body.ok).toBe(true);

		token = body.token

		console.log(token);
	});

	test('Fetch con token debería funcionar', async () => {
		// Se valida que se grabe el token en el localStorage y que diga el siguiente mensaje:
		// "No existe un evento con ese id "
		localStorage.setItem('token', token)

		const resp = await fetchConToken('events/62282c3f7d2ca8e28b0a8725', {}, 'DELETE')
		const body = await resp.json();

		expect( body.msg ).toBe('No existe un evento con ese id ')

		console.log(token);
	});
});
