import axios from 'axios';

const SPRING_SERVER_URL = 'http://localhost:8080';

async function verifUser(token, origin) {
	try {
		if (!token || !token.startsWith('Bearer ')) {
			return false;
		}
		const jwt = token.substring(7);
		console.log('JWT:', jwt);
		const response = await axios.get(`${SPRING_SERVER_URL}/users/users/authenticate`, {
			params: {
				jwt: jwt,
				origin: origin
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
	const origin = req.headers.origin || req.headers.referer;
	const originparse = origin ? new URL(origin).origin : '';
	console.log('Origin', originparse);

	if(token){
		const isValidUser = await verifUser(token, originparse);
		if (!isValidUser) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		next();
	}else{
		res.status(401).json({ message: 'Unauthorized' });
	}

};


export default validateUser;
