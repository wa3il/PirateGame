// Description: Service de gestion de la zone de jeu.
import Zrr from '../models/Zrr.js';

let zrr = null; // Il n'y a qu'une seule ZRR dans votre jeu

const zrrDao = {
	// Créer une nouvelle ZRR
	create: (point1, point2) => {
		if (!zrr) {
			zrr = new Zrr(point1, point2);
			return zrr;
		}
		return null; // Une ZRR existe déjà
	},

	// Lire la ZRR
	get: () => {
		return zrr;
	},

	// Mettre à jour la ZRR
	update: (point1, point2) => {
		if (zrr) {
			zrr.point1 = point1;
			zrr.point2 = point2;
			return zrr;
		}
		return null; // Aucune ZRR à mettre à jour
	},

	// Supprimer la ZRR
	delete: () => {
		zrr = null;
	}
};

export default zrrDao;