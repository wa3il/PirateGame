// adminController.js

import resourceDao from "../DAO/resourceDao.js";
import zrrDao from "../DAO/zrrDao.js";

/**
 * @swagger
 * /zrr:
 *   post:
 *     tags:
 *       - ZRR
 *     summary: Définition des limites de la zone de jeu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               point1:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *               point2:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                   y:
 *                     type: number
 *     responses:
 *       201:
 *         description: Zrr created
 *       409:
 *         description: Zrr already exists
 *       500:
 *         description: Server error
 */
const setZrrLimits = async (req, res) => {
	//set Zrr limits
	const { point1, point2 } = req.body;
	console.log(point1, point2);
	try {
		const zrr = zrrDao.create(point1, point2);
		res.status(201).json(zrr);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


/**
 * @swagger
 * /resources/ttl:
 *   post:
 *     tags:
 *       - Ressource Géolocalisée
 *     summary: Set the Time To Live (TTL) for a resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ttl:
 *                 type: number
 *                 description: The TTL value in seconds
 *     responses:
 *       204:
 *         description: TTL successfully set
 *       400:
 *         description: TTL is not set
 *       500:
 *         description: Server error
 */
const setTTL = async (req, res) => {
	//préciser le TTL initial (valeur par défaut : 1 minute)
	// post /ressources/ttl
	const { ttl } = req.body;
	try {
		if (!ttl) {
			throw new Error('TTL is not set');
		}
		resourceDao.setTTL(ttl);
		res.status(204).json(ttl);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


/**
 * @swagger
 * /triggerPotion:
 *   post:
 *     summary: Déclenchement de l'apparition d'une fiole
 *     tags: [Potion]
 *     operationId: triggerPotion
 *     responses:
 *       201:
 *         description: Fiole created
 *       500:
 *         description: Server error
 */
const triggerPotion = async (req, res) => {
	//déclencher l'apparition d'une fiole
	//create a ressource with role fiole
	try {
		//la position est random dans la ZRR
		if (!zrrDao.zrr) {
			throw new Error('No Zrr exists');
		}
		let position = [Math.floor(Math.random() * (zrrDao.limiteNE.x - zrrDao.limiteNO.x + 1)) + zrrDao.limiteNO.x, Math.floor(Math.random() * (zrrDao.limiteSE.y - zrrDao.limiteNE.y + 1)) + zrrDao.limiteNE.y];
		if(resourceDao.ttl === 0){
			throw new Error('TTL is not set yet');
		}
		const resource = resourceDao.create(null, position, 'fiole', zrrDao.ttl, null, false, false);
		res.status(201).json(resource);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export default {setZrrLimits, setTTL, triggerPotion};