import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

export const requireAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.user?.id;
    if (!userId) res.sendStatus(401);
    else {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) return res.sendStatus(401);

        if (user.role == 'ADMIN') {
            return next();
        } else res.sendStatus(401);
    }
};

export default requireAdmin;
