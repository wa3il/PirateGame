// gameRoutes.js

import express from 'express';
import gameController from '../controllers/gameController.js';
import validateIdentity from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(validateIdentity);

//get all resources
router.get('/resources', gameController.getResources);

//Post an ation on resource
router.post('/resources/:id', gameController.operateResource);

//Update user Position
router.put('/resources/:id/position', gameController.updatePosition);

//get ZRR
router.get('/zrr', gameController.getZrrLimits);

export default router;
