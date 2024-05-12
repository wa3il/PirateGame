// adminRoutes.js

import express from 'express';
import adminController from '../controllers/adminController.js';
//import validateIdentity from '../middlewares/authMiddleware.js';

const router = express.Router();

//router.use(validateIdentity);

//Set Zrr limits
router.post('/zrr', adminController.setZrrLimits);

//Set TTL
router.post('/resources/ttl', adminController.setTTL);

//Trigger potion
router.post('/triggerPotion', adminController.triggerPotion);


export default router;
