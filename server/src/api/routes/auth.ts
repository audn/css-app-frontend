import { Router } from 'express';
import passport from 'passport';

const auth = Router();
// auth.get('/login', (_, res: Response) => {
//     res.redirect(config.twitter.login__url);
// });

// auth.get('/twitter/callback', callback);

auth.get(
    '/twitter',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    }
);
auth.get(
    '/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),

    function (req, res) {
        res.redirect('/');
    }
);

export default auth;
