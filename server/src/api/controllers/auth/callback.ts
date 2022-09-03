import { Request, Response } from 'express';
import { OAuth2 } from 'oauth';
import config from '../../../config';
import prisma from '../../../lib/prisma';
import { signJwt } from '../../../lib/utils/jwt';
const request = require('request');

const callback = async (req: Request, res: Response) => {
      const { code } = req.query as { code: string };

      const clientId = process.env.TWITTER_CLIENT_ID as string;
      const clientSecret = process.env.TWITTER_CLIENT_SECRET as string;

      const oauth2 = new OAuth2(
            clientId,
            clientSecret,
            'https://api.twitter.com/',
            null as any,
            `2/oauth2/token`,
            null as any
      );

      oauth2.getOAuthAccessToken(
            code,
            {
                  grant_type: 'authorization_code',
                  code_verifier: 'challenge',
                  redirect_uri: config.redirect_uri,
                  client_id: 'dTdacThkLVZER0pCZkZ6SklUTjI6MTpjaQ',
            },
            function (e, access_token, result) {
                  const token = access_token;

                  if (token) {
                        const url =
                              'https://api.twitter.com/2/users/me?user.fields=profile_image_url,username,verified';

                        request.get(
                              {
                                    url: url,
                                    auth: {
                                          bearer: token,
                                    },
                              },
                              //@ts-ignore
                              async function (e, r, body) {
                                    const { data } = JSON.parse(body);
                                    try {
                                          const user =
                                                await prisma.user.findUnique({
                                                      where: {
                                                            id: data.id,
                                                      },
                                                });
                                          if (!user) {
                                                await prisma.user.create({
                                                      data,
                                                });
                                          }

                                          const accessToken = signJwt(
                                                {
                                                      user: data.id,
                                                },
                                                {
                                                      expiresIn:
                                                            config.cookie
                                                                  .maxAge,
                                                }
                                          );
                                          return res.redirect(
                                                `${process.env.FRONTEND_URL}/auth?code=${accessToken}`
                                          );
                                    } catch (error: any) {
                                          return res.json({
                                                error: error.message,
                                          });
                                    }
                              }
                        );
                  }
            }
      );
};

export default callback;
