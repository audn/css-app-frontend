import { Router } from 'express';
import { addRatelimiter } from '../../lib/middleware/ratelimit';
import requireAuth from '../../lib/middleware/requireAuth';
import validateResource from '../../lib/middleware/validateResource';
import { createIdeaSchema } from '../../lib/schema/idea';
import { requireAdmin } from './../../lib/middleware/requireAdmin';
import { anyIdea } from './../controllers/idea/anyIdea';

import { getIdea } from '../../lib/schema/idea';

const ideas = Router();

import get from '../controllers/idea/get';
import post from '../controllers/idea/post';
import { remove } from '../controllers/idea/remove';
import { upvote } from '../controllers/idea/upvote';

ideas.get('/:id', anyIdea);
ideas.get('/', get);
ideas.post(
    '/',
    [
        requireAuth,
        validateResource(createIdeaSchema),
        addRatelimiter({ amount: 5, wait: 0 }),
    ],
    post
);
ideas.put(
    '/:id',
    [requireAuth, validateResource(getIdea), addRatelimiter({ amount: 1 })],
    upvote
);
ideas.delete('/:id', requireAdmin, remove);

export default ideas;
