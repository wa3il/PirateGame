// gameController.js

import resourceDao from '../DAO/resourceDao.js';
import zrrDao from '../DAO/zrrDao.js';

const distance = 5;

/**
 * @swagger
 * /resources:
 *   get:
 *     tags:
 *       - Ressource Géolocalisée
 *     summary: Récupération de la liste des ressources géolocalisées
 *     responses:
 *       200:
 *         description: A list of all resources in the game
 *       500:
 *         description: Server error
 */
const getResources = async (req, res) => {
	// Récupération de la liste des ressources géolocalisées 
	//Get /resources
	try {
		const allResources = resourceDao.getAll();
		res.status(200).json(allResources);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     tags:
 *       - Ressource Géolocalisée
 *     summary: Récupération d'une ressource par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resource found
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error	
 */
const getById = async (req, res) => {
	//get by id
	//Get /resources/:id
	const { id } = req.params;
	try {
		//id en string
		let idStr = String(id); 
		console.log(idStr);
		const resource = resourceDao.getById(idStr);
		if (resource) {	
			res.status(200).json(resource);
		} else {
			res.status(404).json({ message: 'Resource not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

/**
 * @swagger
 * /resources/{id}/position:
 *   put:
 *     tags:
 *       - Ressource Géolocalisée
 *     summary: Mise à jour de la position du joueur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: number
 *             example: [10, 20]
 *     responses:
 *       204:
 *         description: Position updated
 *       400:
 *         description: Position is required
 *       401:
 *         description: Position must be an array of 2 numbers
 *       402:
 *         description: Position is out of ZRR
 *       500:
 *         description: Server error
 */
const updatePosition = async (req, res) => {
	// Mise à jour de la position du joueur
	//Put /resources/:id/position 
	//Todo: cdt si position est dans la ZRR
	const { id } = req.params;
	const { position } = req.body;
	console.log(position);
	try {
		if (!position || !Array.isArray(position) || position.length !== 2){
			res.status(400).json({ message: 'Position is required' });
		}
		else if (typeof position[0] !== 'number' || typeof position[1] !== 'number') {
			res.status(401).json({ message: 'Position must be an array of 2 numbers' });
		}
		else if (!zrrDao.isInZrr(position)){
			res.status(402).json({ message: 'Position is out of ZRR' });
		}
		else {		
			resourceDao.updatePosition(id, position);
			res.status(204).json({message: 'Position updated'});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//gettl
const getTTL = async (req, res) => {
	try {
		const ttl = resourceDao.getTTL();
		res.status(200).json(ttl);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}


/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     tags:
 *       - Ressource Géolocalisée
 *     summary: Opération sur une ressource
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 example: "grab potion flask"
 *     responses:
 *       204:
 *         description: Potion grabbed
 *       404:
 *         description: No potion flask nearby
 *       400:
 *         description: Action not found
 *       500:
 *         description: Server error
 */
const operateResource = async (req, res) => {
	// Récupération d'une fiole
	// Condition si joueur est proche <distance de la fiole
	//ID JOUEUR
	const { id } = req.params;
	const { action } = req.body;
	try {
		const resource = resourceDao.getById(id);
		console.log(action);
		if (resource) {
			if (action === 'grab potion flask') {
				//on vérifie si le joueur est proche de la fiole
				let fioles = resourceDao.grabPotions(id,distance);
				if (fioles.length === 0) {
					res.status(404).json({ message: 'No potion flask nearby' });
				} else {
					res.status(204).json(fioles);
				}
			}
			else if (action === 'terminate pirate') {
				resourceDao.terminate(id);
				res.status(204).json({ message: 'Pirate terminated' });
			}
			else if (action === 'turn villager into pirate') {
				//pourquoi ca m'envoie pas le message de retour

				resourceDao.turnIntoPirate(id);
				res.status(204).json({ message: 'Villager turned into pirate' });
			}
			else {
				res.status(400).json({ message: 'Action not found' });
			}
		}
	} catch (error) {
		console.error('Error in operateResource:', error);
		res.status(500).json({ message: error.message });
	}
};

/**
 * @swagger
 * /zrr:
 *   get:
 *     tags:
 *       - ZRR
 *     summary: Récupération des limites de la ZRR
 *     responses:
 *       200:
 *         description: ZRR limits
 *       404:
 *         description: No Zrr exists
 *       500:
 *         description: Server error
 */
const getZrrLimits = async (req, res) => {
	try {
		const zrrLimits = zrrDao.get();
		res.status(200).json(zrrLimits);
	} catch (error) {
		if (error.message === 'No Zrr exists') {
			res.status(404).json({ message: 'No Zrr exists' });
		} else {
			res.status(500).json({ message: error.message });
		}
	}
};

export default { getResources, getById, updatePosition, operateResource, getZrrLimits , getTTL};