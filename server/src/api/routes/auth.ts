import { Router } from 'express';
import passport from 'passport';
import logout from '../controllers/auth/logout';

const auth = Router();

auth.get(
    '/twitter',
    passport.authenticate('twitter', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect(process.env.FRONTEND_URL);
    }
);
auth.get(
    '/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/error' }),

    function (req, res) {
        res.redirect(process.env.FRONTEND_URL);
    }
);
auth.post('/logout', logout);

export default auth;
