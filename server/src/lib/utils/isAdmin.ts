import { Request, Response } from 'express';
import prisma from '../prisma';

export const isAdmin = async (req: Request, res: Response) => {
      const userId = res.locals.userId;

      if (!userId) return false;
      else {
            const user = await prisma.user.findUnique({
                  where: {
                        id: userId,
                  },
            });
            if (!user) return false;

            if (user.role == 'ADMIN') {
                  return true;
            } else return false;
      }
};

export default isAdmin;
