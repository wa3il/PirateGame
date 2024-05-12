// Description: Service de gestion de la zone de jeu.
import Zrr from "../models/Zrr.js";

let zrr =  new Zrr(null, null);
let limiteNO = null;
let limiteNE = null;
let limiteSE = null;
let limiteSO = null;

const zrrDao = {
	
	create: (point1, point2) => {
		// Déterminer les coordonnées du coin NO et NE 
		const limite_NO = {
			x: Math.min(point1.x, point2.x),
			y: Math.min(point1.y, point2.y)
		};
		const limite_NE = {
			x: Math.max(point1.x, point2.x),
			y: Math.min(point1.y, point2.y)
		};

		// Déterminer les coordonnées du coin SE  et SO 
		const limite_SE = {
			x: Math.max(point1.x, point2.x),
			y: Math.max(point1.y, point2.y)
		};
		const limite_SO = {
			x: Math.min(point1.x, point2.x),
			y: Math.max(point1.y, point2.y)
		};

		// Enregistrer les limites de la ZRR
		limiteNO = limite_NO;
		limiteNE = limite_NE;
		limiteSE = limite_SE;
		limiteSO = limite_SO;
		zrr = new Zrr(point1, point2);
		return zrr;
	},

	update: (point1, point2) => {
		zrr.point1 = point1;
		zrr.point2 = point2;
		return zrr;
	},

	get: () => {
		if (!zrr) {
			throw new Error('No Zrr exists');
		}
		return zrr;
	},

	getLimits: () => {
		if (!zrr) {
			throw new Error('No Zrr exists');
		}
		return { limiteNO, limiteNE, limiteSE, limiteSO };
	},

	//is in ZRR
	isInZrr: (position) => {	
		console.log(position);
		if (!zrr) {
			throw new Error('No Zrr exists');
		}
		console.log(zrr.point1);
		console.log(zrr.point2);
		//[ 10, 10 ]
		//[ 10, 10 ]
		//{ x: 0, y: 0 }
		//{ x: 50, y: 50 }

		if (position[0] >= zrr.point1.x && position[0] <= zrr.point2.x && position[1] >= zrr.point1.y && position[1] <= zrr.point2.y) {
			return true;
		}
		return false;
	}

};

export default zrrDao;