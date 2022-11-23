import passport from 'passport';

export const twitterLogin = () => {
    passport.authenticate('twitter', { failureRedirect: '/' }),
        function (req: any, res: any) {
            return res.redirect('/');
        };
};
