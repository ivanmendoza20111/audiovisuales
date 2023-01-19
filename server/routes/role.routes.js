import { Router } from 'express';

import { findAll } from '../controllers/role.controller.js';

const router = Router();

router.get('/role', findAll);

export default router;
