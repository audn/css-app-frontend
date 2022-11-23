import passport from 'passport';

export const twitterCallback = () => {
    return (
        passport.authenticate('twitter', { failureRedirect: '/' }),
        function (req: any, res: any) {
            res.redirect('/');
        }
    );
};
