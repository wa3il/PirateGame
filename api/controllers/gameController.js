// gameController.js

import axios from 'axios';
import { getGameResources } from '../models/gameResource.js';

// Mise à jour de la position du joueur
const updatePosition = async (req, res) => {
	const { id } = req.params;
	const { position } = req.body;

	const player = getGameResources().find((resource) => resource.id === id);

	if (!player) {
		return res.status(404).json({ message: 'Player not found' });
	}

	player.position = position;

	try {
		const response = await axios.put(`http://localhost:8080/api/updatePosition/${id}`, {
			position,
		});

		const updatedPlayer = response.data;
		// Mise à jour locale de la position du joueur si nécessaire
		if (updatedPlayer.id === id) {
			const index = getGameResources().findIndex((resource) => resource.id === id);
			if (index !== -1) {
				getGameResources()[index] = updatedPlayer;
			}
		}

		res.json(updatedPlayer);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Récupération de la liste des ressources géolocalisées
const getResources = async (req, res) => {
	try {
		const response = await axios.get('http://localhost:8080/api/resources');
		const resources = response.data;
		res.json(resources);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Récupération d'une fiole
const retrieveFiole = async (req, res) => {
	const { id } = req.params;
	try {
		const response = await axios.get(`http://localhost:8080/api/retrieveFiole/${id}`);
		const fiole = response.data;
		res.json(fiole);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Récupération des limites de la ZRR
const getZrrLimits = async (req, res) => {
	try {
		const response = await axios.get('http://localhost:8080/api/zrrLimits');
		const zrrLimits = response.data;
		res.json(zrrLimits);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export default { updatePosition, getResources, retrieveFiole, getZrrLimits };
