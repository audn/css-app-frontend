import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const removePost = async (req: Request, res: APIJson) => {
    const id = req.params.id;

    try {
        const post = await prisma.post.delete({
            where: {
                id,
            },
        });
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
        } else return res.json({ message: 'Deleted post' });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
