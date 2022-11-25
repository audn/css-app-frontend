import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const allPosts = async (req: Request, res: APIJson) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true },
        });
        if (!posts) {
            res.status(404).json({ error: 'No posts' });
        } else
            return res.json({
                payload: { results: posts, count: posts.length },
            });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
