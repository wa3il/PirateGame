// Description: Service de gestion de la zone de jeu.


let zrr = []; // Il n'y a qu'une seule ZRR dans votre jeu

const zrrDao = {
	// Créer une nouvelle ZRR
	create: (point1, point2) => {
		if (zrr.length === 0) {
			zrr.push([point1, point2]);
			return zrr;
		} else {
			throw new Error('Zrr already exists');
		}
	},

	// Lire la ZRR
	get: () => {
		if (zrr.length === 0) {
			throw new Error('No Zrr exists');
		}
		return zrr;
	},

	// Mettre à jour la ZRR
	update: (point1, point2) => {
		if (zrr.length === 0) {
			throw new Error('No Zrr exists');
		}
		zrr[0] = [point1, point2];
		return zrr;
	},

	// Supprimer la ZRR
	delete: () => {
		zrr = null;
		return zrr;
	}
};

export default zrrDao;