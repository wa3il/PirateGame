// gameRoutes.js

import express from 'express';
import gameController from '../controllers/gameController.js';
import validateIdentity from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(validateIdentity);

//get all resources
router.get('/resources', gameController.getResources);

//get resource by id
router.get('/resources/:id', gameController.getById);

//get ttl
router.get('/ttl', gameController.getTTL);

//Post an action on resource
router.post('/resources/:id', gameController.operateResource);

//Update user Position
router.put('/resources/:id/position', gameController.updatePosition);

//get ZRR
router.get('/zrr', gameController.getZrrLimits);

export default router;