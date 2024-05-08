// gameRoutes.js

import express from 'express';
import gameController from '../controllers/gameController.js';
import validateIdentity from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(validateIdentity);

router.put('/updatePosition/:id', gameController.updatePosition);
router.get('/resources', gameController.getResources);
router.get('/retrieveFiole/:id', gameController.retrieveFiole);
router.get('/zrrLimits', gameController.getZrrLimits);

export default router;
