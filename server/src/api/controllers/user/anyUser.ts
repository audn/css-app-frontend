import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types';

export const anyUser = async (req: Request, res: APIJson) => {
      const user = req.params.id;

      try {
            const getUser = await prisma.user.findMany({
                  where: {
                        id: user,
                  },
                  include: {
                        ideas: true,
                        upvotedIdeas: true,
                  },
            });

            return res.json({ payload: { results: getUser } });
      } catch (error: any) {
            res.json({
                  error: error.message,
            });
      }
};
