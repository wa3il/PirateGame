import express from 'express';
import gameController from '../controllers/gameController';

const router = express.Router();

router.put('/updatePosition', gameController.updatePosition);
router.get('/resources', gameController.getResources);
router.post('/retrieveFiole', gameController.retrieveFiole);
router.get('/zrrLimits', gameController.getZrrLimits);

export default router;
