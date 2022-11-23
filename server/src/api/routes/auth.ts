import { Router } from 'express';
import passport from 'passport';
import logout from '../controllers/auth/logout';

const auth = Router();

auth.get(
    '/twitter',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    }
);
auth.get(
    '/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/error' }),

    function (req, res) {
        res.redirect('/');
    }
);
auth.post('/logout', logout);

export default auth;
