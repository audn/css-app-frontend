import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const allCategories = async (req: Request, res: APIJson) => {
    try {
        const posts = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
        });
        if (!posts) {
            throw new Error('No posts');
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
