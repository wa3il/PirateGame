// adminController.js

import axios from 'axios';
import { setZrrData } from '../data/zrr';
import { getGameResources } from '../data/gameResource';

// Fixer les limites du village ZRR
const setZrr = async (req, res) => {
	const { limiteNO, limiteNE, limiteSE, limiteSO } = req.body;

	try {
		const response = await axios.post('http://localhost:8080/api/setZrr', {
			limiteNO,
			limiteNE,
			limiteSE,
			limiteSO,
		});

		const updatedZrr = response.data;
		setZrrData(updatedZrr);

		res.json(updatedZrr);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Préciser le TTL des fioles
const setTtl = async (req, res) => {
	const { id, ttl } = req.body;
	const fiole = getGameResources().find((resource) => resource.id === id);

	if (!fiole || fiole.role !== 'fiole') {
		return res.status(404).json({ message: 'Fiole not found' });
	}

	try {
		const response = await axios.post('http://localhost:8080/api/setTtl', {
			id,
			ttl,
		});

		const updatedFiole = response.data;

		// Mettre à jour les ressources locales si nécessaire
		if (updatedFiole.id === id) {
			const index = getGameResources().findIndex((resource) => resource.id === id);
			if (index !== -1) {
				getGameResources()[index] = updatedFiole;
			}
		}

		res.json(updatedFiole);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Déclencher l'apparition d'une nouvelle fiole
const triggerFiole = async (req, res) => {
	const { position } = req.body;

	try {
		const response = await axios.post('http://localhost:8080/api/triggerFiole', {
			position,
		});

		const newFiole = response.data;
		getGameResources().push(newFiole);

		res.json(newFiole);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export default { setZrr, setTtl, triggerFiole };
