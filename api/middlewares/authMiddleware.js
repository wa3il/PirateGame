import axios from 'axios';

const SPRING_SERVER_URL = 'http://localhost:8080';
const predefinedOrigin = 'http://localhost:8080/'; // Origine prédéfinie pour les tests

const validateUser = async (token, origin) => {
	try {
		// Si le token est invalide ou n'est pas au format attendu, renvoyer false
		if (!token || !token.startsWith('Bearer ')) {
			return false;
		}
		// Extraire le JWT du token
		const jwt = token.substring(7);
		// Utiliser l'origine prédéfinie pour les tests
		const actualOrigin = origin || predefinedOrigin;
		// Effectuer la requête pour valider l'utilisateur avec l'origine prédéfinie
		console.log('Actual Origin:', actualOrigin);
		console.log('JWT:', jwt);

		const response = await axios.get(`${SPRING_SERVER_URL}/users_war_exploded/users/authenticate?jwt=${jwt}&origin=${actualOrigin}`);
		// Vérifier si la réponse est réussie (statut 200 OK)
		return response.status === 200;
	} catch (error) {
		console.error('Erreur de validation de l\'utilisateur :', error.message);
		return false;
	}
};


export default validateUser;
