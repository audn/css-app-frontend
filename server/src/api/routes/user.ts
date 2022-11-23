import { Router } from 'express';
import { requireAuth } from './../../lib/middleware/requireAuth';

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

export default user;
