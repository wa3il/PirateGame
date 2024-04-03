// adminController.js

const ZRR = require('../models/ZRR');
const GameResource = require('../models/GameResource');

// Fixer les limites du village ZRR
exports.setZRRLimits = async (req, res) => {
	const { limiteNO, limiteNE, limiteSE, limiteSO } = req.body;

	try {
		let zrr = await ZRR.findOne();

		if (!zrr) {
			zrr = new ZRR({
				limiteNO,
				limiteNE,
				limiteSE,
				limiteSO,
			});
		} else {
			zrr.limiteNO = limiteNO;
			zrr.limiteNE = limiteNE;
			zrr.limiteSE = limiteSE;
			zrr.limiteSO = limiteSO;
		}

		const savedZRR = await zrr.save();
		res.json(savedZRR);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Préciser le TTL des fioles
exports.setFioleTTL = async (req, res) => {
	const { id, ttl } = req.body;

	try {
		const fiole = await GameResource.findById(id);

		if (!fiole || fiole.role !== 'fiole') {
			return res.status(404).json({ message: 'Fiole not found' });
		}

		fiole.fioleInfo.ttl = ttl;
		const updatedFiole = await fiole.save();

		res.json(updatedFiole);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Déclencher l'apparition d'une nouvelle fiole
exports.createFiole = async (req, res) => {
	const { position } = req.body;

	try {
		const newFiole = new GameResource({
			position,
			role: 'fiole',
			fioleInfo: {
				nombreFioles: 1,
				ttl: 60 * 60, // TTL par défaut d'une heure
			},
		});

		const savedFiole = await newFiole.save();
		res.json(savedFiole);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
