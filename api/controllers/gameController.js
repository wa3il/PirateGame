// gameController.js

import resourceDao from '../DAO/resourceDao.js';
import zrrDao from '../DAO/zrrDao.js';
//import e from 'express';



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

// Mise à jour de la position du joueur
//Put /resources/:id/position 
//Todo: cdt si position est dans la ZRR
const updatePosition = async (req, res) => {
	const { id } = req.params;
	const { position } = req.body;
	try {
		resourceDao.updatePosition(id, position);
		res.status(204).json({message: 'Position updated'});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};



// Récupération d'une fiole
//TODO : Condition si joueur est proche <5m à rajouter 
const operateResource = async (req, res) => {
	const { id } = req.params;
	const { action } = req.body;
	try {
		const resource = resourceDao.getById(id);
		if (resource) {
			if (action === 'grab potion flask') {
				//resourceDao.addFiole(iduser,idfiole);
				res.status(204);
			}
			else if (action === 'terminate pirate') {
				//resourceDao.terminatePirate(id);
				res.status(204);
			}
			else if (action === 'turn villager into pirate') {
				//resourceDao.turnIntoPirate(id);
				res.status(204);
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
		res.status(500).json({ message: error.message });
	}
};

export default { updatePosition, getResources, operateResource, getZrrLimits };
