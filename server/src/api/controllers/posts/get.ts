import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const getPost = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
                libraryRelations: true,
            },
        });
        if (!post) {
            throw new Error('Post not found');
        } else return res.json({ payload: { results: post } });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
