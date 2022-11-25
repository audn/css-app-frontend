import { Router } from 'express';

const library = Router();

import { searchPosts } from '../controllers/search/posts';

library.post('/', searchPosts);

export default library;
