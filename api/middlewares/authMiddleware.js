import axios from 'axios';

const SPRING_SERVER_URL = 'http://localhost:8080';
const predefinedOrigin = 'http://localhost:8080/'; // Origine prédéfinie pour les tests

async function verifUser(token, origin) {
	try {
		if (!token || !token.startsWith('Bearer ')) {
			return false;
		}
		const jwt = token.substring(7);
		const actualOrigin = origin || predefinedOrigin;
		console.log('Actual Origin:', actualOrigin);
		console.log('JWT:', jwt);
		const response = await axios.get(`${SPRING_SERVER_URL}/users/users/authenticate`, {
			params: {
				jwt: jwt,
				origin: actualOrigin
			}
		});
		return response.status === 200;
  
	} catch (error) {
		if (error.response) {
			console.error('Status:', error.response.status);
			console.error('Headers:', error.response.headers);
			console.error('Data:', error.response.data);
		} else {
			console.error('Error:', error.message);
		}
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
