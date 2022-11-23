import { Router } from 'express';
import requireAuth from '../../lib/middleware/requireAuth';

const posts = Router();

import { allPosts } from '../controllers/posts/all';
import { createPost } from '../controllers/posts/create';
import { removePost } from '../controllers/posts/delete';
import { getPost } from '../controllers/posts/get';

posts.get('/', allPosts);
posts.post('/', requireAuth, createPost);
posts.get('/:id', getPost);
posts.delete('/:id', requireAuth, removePost);

export default posts;
