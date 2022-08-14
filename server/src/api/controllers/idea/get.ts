import { Request, Response } from 'express';
import prisma from '../../../lib/prisma';
import isAdmin from '../../../lib/utils/isAdmin';

type Sort = 'date' | 'verifiedAuthor' | 'votes';

export const get = async (req: Request, res: Response) => {
      const { sort } = req.query as { [key: string]: Sort };

      const verifiedAuthor = sort == 'verifiedAuthor';
      const mostVotes = sort == 'votes';
      const admin = await isAdmin(req, res);

      console.log(admin);

      let ideas;
      const include = {
            user: true,
            upvotes: {
                  select: {
                        user: true,
                  },
            },
            ...((await isAdmin(req, res)) && {
                  downvotes: {
                        select: {
                              user: true,
                        },
                  },
            }),
      };

      if (verifiedAuthor) {
            ideas = await prisma.idea.findMany({
                  where: {
                        user: {
                              verified: true,
                        },
                  },
                  include,
            });
      } else if (mostVotes) {
            ideas = await prisma.idea.findMany({
                  orderBy: {
                        upvotes: {
                              _count: 'desc',
                        },
                  },
                  include,
            });
      } else {
            ideas = await prisma.idea.findMany({
                  orderBy: {
                        dateAdded: 'desc',
                  },
                  include,
            });
      }
      return res.json({
            payload: { results: ideas, count: ideas.length },
      });
};
export default get;
