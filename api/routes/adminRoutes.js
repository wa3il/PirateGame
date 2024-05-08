// adminRoutes.js

import express from 'express';
import adminController from '../controllers/adminController.js';
import validateIdentity from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(validateIdentity);

router.post('/setZrr', adminController.setZrr);
router.post('/setTtl', adminController.setTtl);
router.post('/triggerFiole', adminController.triggerFiole);

export default router;
