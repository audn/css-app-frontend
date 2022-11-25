import { Request, Response, Router } from 'express';
import auth from './routes/auth';
import categories from './routes/categories';
import library from './routes/library';
import posts from './routes/posts';
import search from './routes/search';
import user from './routes/user';

const api = Router();

api.get('/', (req: Request, res: Response) => {
    res.json(req.user);
});

api.use('/auth', auth);
api.use('/users', user);
api.use('/posts', posts);
api.use('/search', search);
api.use('/categories', categories);
api.use('/library', library);

export default api;
