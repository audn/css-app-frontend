import config from '../config';
import prisma from './prisma';
import { ITwitter, IUser } from './types/types';

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

export default function authStrategy() {
    passport.serializeUser((user: IUser.User, done: any) => {
        done(null, user);
    });
    passport.deserializeUser(async (profile: IUser.User, done: any) => {
        const user = await prisma.user.findUnique({
            where: {
                twitterId: profile.twitterId,
            },
        });

        if (user) done(null, profile);
        else {
            done(null, false);
        }
    });

    passport.use(
        new TwitterStrategy(
            {
                consumerKey: process.env.API_KEY,
                consumerSecret: process.env.API_SECRET,
                callbackURL: config.twitter.redirect_uri,
            },
            async (
                _: any,
                tokenSecret: any,
                profile: ITwitter.User,
                done: any
            ) => {
                const data = profile;

                try {
                    const user = await prisma.user.findUnique({
                        where: { twitterId: String(data.id) },
                    });

                    if (user) {
                        done(null, user);
                    } else {
                        const newUser = await prisma.user.create({
                            data: {
                                avatar: data.photos[0].value,
                                username: data.username,
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
