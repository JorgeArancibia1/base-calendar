import { fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch', () => {
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
	});
});
