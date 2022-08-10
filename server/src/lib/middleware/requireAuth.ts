import { NextFunction, Request, Response } from 'express';

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = res.locals.userId;
    if (!userId) {
        res.sendStatus(401);
    } else {
        next();
    }
};

export default requireAuth;
