import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

export const requireAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = res.locals.userId;
    if (!userId) res.sendStatus(401);
    else {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) throw Error('User not found');

        if (user.role == 'ADMIN') {
            next();
        } else res.sendStatus(401);
    }
};

export default requireAdmin;
