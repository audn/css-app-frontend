import { Router } from 'express';
import { anyUser } from '../controllers/user/anyUser';
import { requireAdmin } from './../../lib/middleware/requireAdmin';
import { requireAuth } from './../../lib/middleware/requireAuth';
import { changeRole } from './../controllers/user/role';

const user = Router();

import prisma from '../../lib/prisma';
import { me } from '../controllers/user/me';

user.get('/', async (req: any, res: any) => {
    await prisma.user.deleteMany();
    return res.json({ message: true });
});
user.get('/me', requireAuth, me);
user.get('/:id', anyUser);
user.put('/:id/role', requireAdmin, changeRole);

export default user;
