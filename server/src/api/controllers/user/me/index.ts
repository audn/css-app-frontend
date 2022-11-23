import { Request } from 'express';
import prisma from '../../../../lib/prisma';
import { APIJson } from '../../../../lib/types/types';

export const me = async (req: Request, res: APIJson) => {
    const userId = req?.user?.id;

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
