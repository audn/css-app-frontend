import { NextFunction, Request, Response } from 'express';

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user;
    if (!user) {
        res.status(401).json({ error: true, message: 'auth issue' });
    } else {
        next();
    }
};

export default requireAuth;
