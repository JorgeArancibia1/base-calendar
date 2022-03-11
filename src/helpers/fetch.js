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

export { fetchSinToken };
