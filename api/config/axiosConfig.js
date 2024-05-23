import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8080', // Serveur Spring sur le port 8080
});

export default instance;
