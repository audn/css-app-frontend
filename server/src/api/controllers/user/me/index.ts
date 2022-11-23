import { Request, Response } from 'express';
import prisma from '../../../../lib/prisma';

export const me = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    console.log(req.user);

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
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
