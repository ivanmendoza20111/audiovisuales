import { Router } from 'express';
import { ResetPassword } from '../controllers/resetPasswordController';

const router = Router();

router.put('/resetPassword/:id', ResetPassword);

export default router;
