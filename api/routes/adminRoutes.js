// adminRoutes.js

import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

router.post('/setZrr', adminController.setZrr);
router.post('/setTtl', adminController.setTtl);
router.post('/triggerFiole', adminController.triggerFiole);

export default router;
