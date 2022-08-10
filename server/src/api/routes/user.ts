import { Router } from 'express';
import { anyUser } from '../controllers/user/anyUser';
import { requireAdmin } from './../../lib/middleware/requireAdmin';
import { requireAuth } from './../../lib/middleware/requireAuth';
import { changeRole } from './../controllers/user/role';

const user = Router();

import { me } from '../controllers/user/me';

user.get('/me', requireAuth, me);
user.get('/:id', anyUser);
user.put('/:id/role', requireAdmin, changeRole);

export default user;
