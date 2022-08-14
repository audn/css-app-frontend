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

      const hasPreviouslyDownvoted = await prisma.downvote.findFirst({
            where: {
                  ideaId,
                  userId,
            },
      });

      if (hasPreviouslyDownvoted) {
            await prisma.downvote.delete({
                  where: {
                        id: hasPreviouslyDownvoted.id,
                  },
            });
            await prisma.idea.update({
                  data: {
                        voteCount: {
                              increment: 1,
                        },
                  },
                  where: { id: req.params.id },
            });
      }

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
            await prisma.idea.update({
                  data: {
                        voteCount: {
                              decrement: 1,
                        },
                  },
                  where: { id: req.params.id },
            });
            return res.json({ payload: { results: idea.voteCount - 1 } });
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
            await prisma.idea.update({
                  data: {
                        voteCount: {
                              increment: 1,
                        },
                  },
                  where: { id: req.params.id },
            });
            return res.json({ payload: { results: idea.voteCount + 1 } });
      }
};
export default upvote;
