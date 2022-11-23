import { Request, Response, Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';

const api = Router();

api.get('/', (req: Request, res: Response) => {
    res.json(req.user);
});

api.use('/auth', auth);
api.use('/users', user);

export default api;
