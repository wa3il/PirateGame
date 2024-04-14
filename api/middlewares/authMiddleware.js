import axios from '../config/axiosConfig.js';

// Middleware pour valider l'identité de l'utilisateur avec Spring
const validateIdentity = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Missing authorization token' });
	}

	try {
		const response = await axios.post('/validateToken', { token });

		if (response.data.valid) {
			next();
		} else {
			return res.status(401).json({ message: 'Invalid authorization token' });
		}
	} catch (error) {
		console.error('Error validating token:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default validateIdentity;
