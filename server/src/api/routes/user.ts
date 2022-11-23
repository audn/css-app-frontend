import { Router } from 'express';
import { requireAdmin } from './../../lib/middleware/requireAdmin';
import { requireAuth } from './../../lib/middleware/requireAuth';
import { changeRole } from './../controllers/user/role';

const user = Router();

import prisma from '../../lib/prisma';
import { me } from '../controllers/user/me';
import { updatePreferences } from '../controllers/user/me/preferences';

user.get('/delete', async (req: any, res: any) => {
    await prisma.user.deleteMany();
    return res.json({ message: true });
});
user.get('/me', requireAuth, me);
user.put('/me/preferences', requireAuth, updatePreferences);

user.put('/:id/role', requireAdmin, changeRole);

export default user;
