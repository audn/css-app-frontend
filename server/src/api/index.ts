import { Request, Response, Router } from 'express';
import auth from './routes/auth';
import ideas from './routes/ideas';
import user from './routes/user';

const api = Router();

api.get('/', (req: Request, res: Response) => {
    console.log(req.user);

    res.json(req.user);
});

api.use('/ideas', ideas);
api.use('/auth', auth);
api.use('/users', user);

export default api;
