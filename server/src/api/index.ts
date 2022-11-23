import { Request, Response, Router } from 'express';
import auth from './routes/auth';
import posts from './routes/posts';
import user from './routes/user';

const api = Router();

api.get('/', (req: Request, res: Response) => {
    res.json(req.user);
});

api.use('/auth', auth);
api.use('/users', user);
api.use('/posts', posts);

export default api;
