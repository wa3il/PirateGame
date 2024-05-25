import axios from 'axios';

const SPRING_SERVER_URL = 'http://localhost:8080';
const predefinedOrigin = 'http://localhost:8080/'; // Origine prédéfinie pour les tests

async function verifUser(token, origin) {
	try {
		// Si le token est invalide ou n'est pas au format attendu, renvoyer false
		if (!token || !token.startsWith('Bearer ')) {
			return false;
		}

		// Extraire le JWT du token
		const jwt = token.substring(7);
		const actualOrigin = origin || predefinedOrigin;
		console.log('Actual Origin:', actualOrigin);
		console.log('JWT:', jwt);

		const response = await axios.get(`${SPRING_SERVER_URL}/users_war_exploded/users/authenticate`, {
			params: {
				jwt: jwt,
				origin: actualOrigin
			}
		});

		// Vérifier si la réponse est réussie (statut 200 OK)
		return response.status === 200;
	} catch (error) {
		console.error('Erreur de validation de l\'utilisateur :', error.response ? error.response.data : error.message);
		return false;
	}
}

const validateUser = async (req,res,next) => {
	const token = req.headers.authorization;
	const origin = req.headers.origin;

	if(token){
		const isValidUser = await verifUser(token, origin);
		if (!isValidUser) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		next();
	}else{
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

};


export default validateUser;
