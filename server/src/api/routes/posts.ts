import { Router } from 'express';

const posts = Router();

import { allPosts } from '../controllers/posts/all';
import { createPost } from '../controllers/posts/create';
import { removePost } from '../controllers/posts/delete';
import { getPost } from '../controllers/posts/get';

posts.get('/', allPosts);
posts.post('/', createPost);
posts.get('/:id', getPost);
posts.delete('/:id', removePost);

export default posts;
