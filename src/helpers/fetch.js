/* ESTE HELPER SOLO SE USA CUANDO UNO NO ESTÁ USANDO AXIOS */

const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = 'GET') => {
	const url = `${baseUrl}/${endpoint}`;

	if (method === 'GET') {
		return fetch(url);
	} else {
		return fetch(url, {
			method, // El método va a depender de lo que se mande como argumento
			headers: {
				'Content-type': 'application/json', // Esto determina que solo recibirá info tipo  'json'
			},
			body: JSON.stringify(data), // Se anexa la data como .JSON
		});
	}
};

const fetchConToken = (endpoint, data, method = 'GET') => {
	const url = `${baseUrl}/${endpoint}`;
	const token = localStorage.getItem('token') || '';

	if (method === 'GET') {
		return fetch(url, {
			method,
			headers: {
				'x-token': token,
			},
		});
	} else {
		return fetch(url, {
			method, // El método va a depender de lo que se mande como argumento
			headers: {
				'Content-type': 'application/json', // Esto determina que solo recibirá info tipo  'json'
				'x-token': token,
			},
			body: JSON.stringify(data), // Se anexa la data como .JSON
		});
	}
};

export { fetchSinToken, fetchConToken };
