import { Response, Router } from 'express';
import config from '../../config';
import callback from '../controllers/auth/callback';

const auth = Router();

auth.get('/login', (_, res: Response) => {
    res.redirect(config.twitterAuth);
});

auth.get('/twitter/callback', callback);

export default auth;
