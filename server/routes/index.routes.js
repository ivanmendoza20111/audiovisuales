import { Router } from 'express';
import { pool } from '../db.js';
import authRoutes from './auth.routes.js';
import forgotPasswordRoutes from './forgotPassword.routes';
import productRoutes from './product.routes.js';
import reservationsRoutes from './reservation.routes';
import resetPasswordRoutes from './resetPassword.routes';
import roleRoutes from './role.routes.js';
import scheduleRoutes from './schedule.routes';
import userRoutes from './users.routes.js';

const router = Router();

router.get('/ping', async (req, res) => {
  const [rows] = await pool.query('SELECT 1 + 1 as result');
  console.log(rows[0]);
  res.json(rows[0]);
});

router.use(authRoutes);
router.use(forgotPasswordRoutes);
router.use(productRoutes);
router.use(scheduleRoutes);
router.use(roleRoutes);
router.use(reservationsRoutes);
router.use(resetPasswordRoutes);
router.use(userRoutes);

export default router;
