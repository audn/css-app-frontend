import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { GetIdea } from '../../../lib/schema/idea';
import { APIJson } from '../../../lib/types';

export const upvote = async (req: Request<GetIdea['params']>, res: APIJson) => {
      const userId = res.locals.userId;
      const ideaId = req.params.id;

      const idea = await prisma.idea.findUnique({
            where: {
                  id: ideaId,
            },
            include: {
                  user: true,
                  upvotes: true,
            },
      });

      if (!idea) return res.status(404).json({ error: 'Not found' });

      const hasPreviouslyUpvoted = await prisma.upvote.findFirst({
            where: {
                  ideaId,
                  userId,
            },
      });

      if (hasPreviouslyUpvoted) {
            await prisma.upvote.delete({
                  where: {
                        id: hasPreviouslyUpvoted.id,
                  },
            });
            return res.json({ message: 'Unvoted post' });
      } else {
            await prisma.upvote.create({
                  data: {
                        idea: {
                              connect: {
                                    id: req.params.id,
                              },
                        },
                        user: {
                              connect: {
                                    id: userId,
                              },
                        },
                  },
            });
            return res.json({ payload: { results: idea } });
      }
};
export default upvote;
