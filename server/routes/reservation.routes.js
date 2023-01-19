import { Router } from 'express';

import { findAllFullInformation, store, update } from '../controllers/reservation.controller';

const router = Router();

router.get('/reservations-full-information', findAllFullInformation);

router.put('/reservations/:id', update);

router.post('/reservations', store);

export default router;
