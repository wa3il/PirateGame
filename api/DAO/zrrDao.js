// Description: Service de gestion de la zone de jeu.

const zrrDao = {
	create: (point1, point2) => {
		if (zrrDao.zrr) {
			throw new Error('Zrr already exists');
		}

		// Déterminer les coordonnées du coin NO et NE 
        const limiteNO = {
            x: Math.min(point1.x, point2.x),
            y: Math.min(point1.y, point2.y)
        };
        const limiteNE = {
            x: Math.max(point1.x, point2.x),
            y: Math.min(point1.y, point2.y)
        };

        // Déterminer les coordonnées du coin SE  et SO 
        const limiteSE = {
            x: Math.max(point1.x, point2.x),
            y: Math.max(point1.y, point2.y)
        };
        const limiteSO = {
            x: Math.min(point1.x, point2.x),
            y: Math.max(point1.y, point2.y)
        };

        // Enregistrer les limites dans le DAO
        zrrDao.limiteNO = limiteNO;
        zrrDao.limiteNE = limiteNE;
        zrrDao.limiteSE = limiteSE;
        zrrDao.limiteSO = limiteSO;
		zrrDao.zrr = { point1, point2 };

		return zrrDao.zrr;
	},

	update: (point1, point2) => {
		if (!zrrDao.zrr) {
			throw new Error('No Zrr exists');
		}
		zrrDao.zrr.point1 = point1;
		zrrDao.zrr.point2 = point2;
		return zrrDao.zrr;
	},

	get: () => {
		if (!zrrDao.zrr) {
			throw new Error('No Zrr exists');
		}
		return zrrDao.zrr;
	},
	zrr: null,
	limiteNO: null,
	limiteNE: null,
	limiteSE: null,
	limiteSO: null
};

export default zrrDao;