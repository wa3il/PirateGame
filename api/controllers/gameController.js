// gameController.js

import axios from 'axios';
import { getGameResources } from '../data/gameResource';
import { getZrrData } from '../data/zrr';

// Mise à jour de la position du joueur
const updatePosition = async (req, res) => {
	const { id } = req.params;
	const { position } = req.body;

	const player = getGameResources().find((resource) => resource.id === id);

	if (!player) {
		return res.status(404).json({ message: 'Player not found' });
	}

	player.position = position;

	res.json(player);
};

// Récupération de la liste des ressources géolocalisées
const getResources = async (req, res) => {
	res.json(getGameResources());
};

// Récupération d'une fiole
const retrieveFiole = async (req, res) => {
	const { id } = req.params;
	const fiole = getGameResources().find((resource) => resource.id === id);

	if (!fiole || fiole.role !== 'fiole') {
		return res.status(404).json({ message: 'Fiole not found' });
	}

	res.json(fiole);
};

// Récupération des limites de la ZRR
const getZrrLimits = async (req, res) => {
	res.json(getZrrData());
};

export default { updatePosition, getResources, retrieveFiole, getZrrLimits };
