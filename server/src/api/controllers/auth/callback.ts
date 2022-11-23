import { Request } from 'express';
import config from '../../../config';
import prisma from '../../../lib/prisma';
import { APIJson, Twitter } from '../../../lib/types';
import { signJwt } from '../../../lib/utils/jwt';
const request = require('request');
export const callback = async (req: Request, res: APIJson) => {
    const { code } = req.query as { code: string };

    const clientId = config.twitter.client_id;
    const redirectUri = config.twitter.redirect_uri;

    const twitterApi = {
        token: `https://api.twitter.com/2/oauth2/token?grant_type=authorization_code&code=${code}&code_verifier=challenge&redirect_uri=${redirectUri}&client_id=${clientId}`,

        user: 'https://api.twitter.com/2/users/me?user.fields=profile_image_url,username',
    };
    async function findOrCreateUser(user: Twitter.User) {
        const findUser = await prisma.user.findUnique({
            where: {
                twitterId: user.id,
            },
        });
        if (!findUser) {
            await prisma.user.create({
                data: {
                    avatar: user.profile_image_url,
                    username: user.username,
                    twitterId: user.id,
                },
            });
        }
        return user;
    }
    async function getOAuthAccessToken() {
        return new Promise<string>(function (resolve, reject) {
            request.post(
                {
                    url: twitterApi.token,
                },

                async function (e: string, r: string, body: string) {
                    const { access_token } = JSON.parse(body);
                    if (access_token && !e) resolve(access_token);
                    else reject(r);
                }
            );
        });
    }
    async function getTwitterUser(token: string) {
        return new Promise<Twitter.User>(function (resolve, reject) {
            request.get(
                {
                    url: twitterApi.user,
                    auth: {
                        bearer: token,
                    },
                },

                async function (error: string, r: string, body: string) {
                    const { data } = JSON.parse(body) as {
                        data: Twitter.User;
                    };
                    if (data && !error) resolve(data);
                    else reject(r);
                }
            );
        });
    }
    try {
        const token = await getOAuthAccessToken();
        const user = await getTwitterUser(token);
        await findOrCreateUser(user);

        const accessToken = signJwt(
            {
                user: user.id,
            },
            {
                expiresIn: config.cookies.maxAge,
            }
        );

        return res.redirect(`/?code=${accessToken}`);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};
