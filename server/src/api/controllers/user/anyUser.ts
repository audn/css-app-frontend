import { Request, Response } from 'express';
import prisma from '../../../lib/prisma';

export const anyUser = async (req: Request, res: Response) => {
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

        return res.json(getUser);
    } catch (error: any) {
        res.json({
            error: error.message,
        });
    }
};
