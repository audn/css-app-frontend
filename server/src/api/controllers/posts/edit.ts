import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const editPost = async (req: Request, res: APIJson) => {
    const postId = req.params.id;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            const edited = await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    ...req.body,
                },
            });
            if (edited) {
                return res.json({ payload: { results: post } });
            } else {
                res.status(400).json({ error: 'Failed to update post' });
            }
        }
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
