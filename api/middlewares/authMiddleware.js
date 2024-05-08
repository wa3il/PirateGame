import jwtService from '../services/JwtService.js';

// Middleware pour valider l'identité de l'utilisateur avec Spring
const validateIdentity = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: 'Missing authorization token' });
	}

	try {
		const isValid = jwtService.verifyToken(token); // Vérifie si le token est valide
		if (isValid) {
			next(); // Token valide, passe au middleware suivant
		} else {
			return res.status(401).json({ message: 'Invalid authorization token' });
		}
	} catch (error) {
		console.error('Error validating token:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default validateIdentity;
