// gameController.js

import resourceDao from '../DAO/resourceDao.js';
import zrrDao from '../DAO/zrrDao.js';

const distance = 5;

// Récupération de la liste des ressources géolocalisées 
//Get /resources
const getResources = async (req, res) => {
	try {
		const allResources = resourceDao.getAll();
		res.status(200).json(allResources);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//get by id
//Get /resources/:id
const getById = async (req, res) => {
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


// Mise à jour de la position du joueur
//Put /resources/:id/position 
//Todo: cdt si position est dans la ZRR
const updatePosition = async (req, res) => {
	const { id } = req.params;
	const { position } = req.body;
	console.log(position);
	try {
		if (!position || !Array.isArray(position) || position.length !== 2){
			res.status(400).json({ message: 'Position is required' });
		}
		else if (typeof position[0] !== 'number' || typeof position[1] !== 'number') {
			res.status(400).json({ message: 'Position must be an array of 2 numbers' });
		}
		else if (!zrrDao.isInZrr(position)){
			res.status(400).json({ message: 'Position is out of ZRR' });
		}
		else {		
			resourceDao.updatePosition(id, position);
			res.status(204).json({message: 'Position updated'});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};



// Récupération d'une fiole
// Condition si joueur est proche <distance de la fiole
const operateResource = async (req, res) => {
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
				resourceDao.terminatePirate(id);
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
		res.status(500).json({ message: error.message });
	}
};

// Récupération des limites de la ZRR
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

export default { getResources, getById, updatePosition, operateResource, getZrrLimits };
