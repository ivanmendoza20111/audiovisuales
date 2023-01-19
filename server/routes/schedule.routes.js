import { Router } from 'express';

import {
  deleteSchedule,
  findAll,
  findAllFullInformation,
  findById,
  store,
  update,
} from '../controllers/schedule.controller';

const router = Router();

router.get('/schedules', findAll);

router.get('/schedules-full-information', findAllFullInformation);

router.get('/schedules/:id', findById);

router.post('/schedules', store);

router.put('/schedules/:id', update);

router.delete('/schedules/:id', deleteSchedule);

export default router;
