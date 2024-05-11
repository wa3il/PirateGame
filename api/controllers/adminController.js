// adminController.js

import resourceDao from "../DAO/resourceDao";
import zrrDao from "../DAO/zrrDao";

//set Zrr limits
const setZrrLimits = async (req, res) => {
    const { point1, point2 } = req.body;
    try {
        const zrr = zrrDao.create(point1, point2);
        res.status(201).json(zrr);
    } catch (error) {
        if (error.message === 'Zrr already exists') {
            res.status(409).json({ message: 'Zrr already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};


//préciser le TTL initial (valeur par défaut : 1 minute)
// post /resources/:id/ttl
const setTTL = async (req, res) => {
    const { id } = req.params;
    const { ttl } = req.body;
    try {
        const resource = resourceDao.setTTL(id, ttl);
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//déclencher l'apparition d'une fiole
//create a ressource with role fiole
const triggerPotion = async (req, res) => {
    try {
        //la position est random dans la ZRR
        if (!zrrDao.zrr) {
            throw new Error('No Zrr exists');
        }
        let position = [Math.floor(Math.random() * (zrrDao.limiteNE.x - zrrDao.limiteNO.x + 1)) + zrrDao.limiteNO.x, Math.floor(Math.random() * (zrrDao.limiteSE.y - zrrDao.limiteNE.y + 1)) + zrrDao.limiteNE.y];
        if(resourceDao.ttll === 0){
            throw new Error('TTL is not set yet');
        }
        const resource = resourceDao.create(null, position, 'fiole', zrrDao.ttl, null, false, false);
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default {setZrrLimits, setTTL, triggerPotion};