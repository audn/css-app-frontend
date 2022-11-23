import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const createPost = async (req: Request, res: APIJson) => {
    const userId = req?.user?.id;
    try {
        const added = await prisma.post.create({
            data: {
                author: {
                    connect: {
                        id: userId,
                    },
                },
                ...req.body,
            },
        });
        if (!added) {
            throw new Error('Failed to add post');
        } else return res.json({ payload: { results: added } });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
