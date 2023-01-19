import { Router } from 'express';

import validate from '../config/joi.validate.js';
import schema from '../utils/validator';
import {
  findAll,
  findById,
  store,
  update,
  deleteUser,
  resetPassword,
  findByRoleId,
} from '../controllers/users.controller.js';

const router = Router();

router.get('/users', findAll);

router.get('/users/:id', findById);

router.get('/users/role/:id', findByRoleId);

router.post('/users', validate(schema.storeUser), store);

router.put('/users/:id', update);

router.put('/users/reset/:id', resetPassword);

router.delete('/users/:id', deleteUser);

export default router;
