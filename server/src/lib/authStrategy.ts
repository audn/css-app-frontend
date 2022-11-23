import prisma from './prisma';

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

export default function authStrategy() {
    passport.serializeUser((user: any, done: any) => {
        console.log('serializeUser', user);

        done(null, user);
    });
    passport.deserializeUser(async (profile: any, done: any) => {
        console.log('deserializeUser', profile);

        const user = await prisma.user.findUnique({
            where: {
                twitterId: profile.id,
            },
        });

        if (user) done(null, user);
        else {
            done(null, false);
        }
    });

    passport.use(
        new TwitterStrategy(
            {
                consumerKey: process.env.API_KEY,
                consumerSecret: process.env.API_SECRET,
                callbackURL: 'http://localhost:4000/auth/twitter/callback',
            },
            async (_: any, tokenSecret: any, profile: any, done: any) => {
                const data = profile._json;

                try {
                    const user = await prisma.user.findUnique({
                        where: { twitterId: String(data.id) },
                    });

                    if (user) {
                        done(null, user);
                    } else {
                        const newUser = await prisma.user.create({
                            data: {
                                avatar: data.profile_image_url,
                                username: data.screen_name,
                                twitterId: String(data.id),
                            },
                        });

                        return done(null, newUser);
                    }
                } catch (err: any) {
                    console.log('error', err.message);
                    return done(err, 'undefined');
                }
            }
        )
    );
}
