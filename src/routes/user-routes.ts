import { Router } from 'express';
import { userProfile } from '../controllers/user-controllers';
import { requireAuth } from '@repo/middlewares/auth-middleware';

const router = Router();

router.use(requireAuth)
router.get('/', userProfile);


export default router