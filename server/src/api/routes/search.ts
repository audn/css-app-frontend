import { Router } from 'express';

const search = Router();

import { searchPosts } from '../controllers/search/posts';

search.post('/', searchPosts);

export default search;
