import { Router } from 'express';
import { ForgotPassword } from '../controllers/forgotPasswordController';

const router = Router();

router.post('/forgotPassword', ForgotPassword);

export default router;
