import { Request, Response } from 'express';
import prisma from '../../../lib/prisma';

export const me = async (req: Request, res: Response) => {
      const userId = res.locals.userId;

      try {
            const user = await prisma.user.findUnique({
                  where: {
                        id: userId,
                  },
                  include: {
                        downvotedIdeas: true,
                        upvotedIdeas: true,
                  },
            });
            if (!user) {
                  throw new Error('User not found');
            } else return res.json({ payload: { results: user } });
      } catch (error: any) {
            res.status(400).json({
                  error: error.message,
            });
      }
};
