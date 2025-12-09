import { Router } from 'express';
import { listUsers, userProfile } from '../controllers/user-controllers';
import { requireAuth } from '@repo/middlewares/auth-middleware';
import { requireAdmin } from '@repo/middlewares/admin-middleware';

const router = Router();

router.use(requireAuth)
router.get('/', userProfile);

router.get('/list', requireAdmin, listUsers)


export default router