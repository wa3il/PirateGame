// gameController.js

const GameResource = require('../models/GameResource');
const ZRR = require('../models/ZRR');

// Mise à jour de la position du joueur
exports.updatePlayerPosition = async (req, res) => {
	const { id } = req.params;
	const { position } = req.body;

	try {
		const updatedPlayer = await GameResource.findByIdAndUpdate(
			id,
			{ position },
			{ new: true }
		);

		if (!updatedPlayer) {
			return res.status(404).json({ message: 'Player not found' });
		}

		res.json(updatedPlayer);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Récupération de la liste des ressources géolocalisées
exports.getAllResources = async (req, res) => {
	try {
		const resources = await GameResource.find();
		res.json(resources);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Récupération d'une fiole
exports.retrieveFiole = async (req, res) => {
	const { id } = req.params;

	try {
		const fiole = await GameResource.findById(id);

		if (!fiole || fiole.role !== 'fiole') {
			return res.status(404).json({ message: 'Fiole not found' });
		}

		res.json(fiole);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Récupération des limites de la ZRR
exports.getZRRLimits = async (req, res) => {
	try {
		const zrr = await ZRR.findOne();

		if (!zrr) {
			return res.status(404).json({ message: 'ZRRLimits not found' });
		}

		res.json(zrr);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

