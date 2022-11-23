import { Request } from 'express';
import prisma from '../../../../lib/prisma';
import { APIJson } from '../../../../lib/types/types';

export const searchPosts = async (req: Request, res: APIJson) => {
    const { q, filter, category } = req.body as {
        q: string;
        filter: { animated: boolean; theme: 'light' | 'dark' };
        category: string;
    };
    try {
        const posts = await prisma.post.findMany({
            where: {
                description: {
                    search: q,
                },
                OR: {
                    title: {
                        search: q,
                    },
                },
                AND: {
                    animated: {
                        equals: filter.animated,
                    },
                    theme: {
                        equals: filter.theme,
                    },
                    category: {
                        equals: category,
                    },
                },
            },
        });
        if (!posts) {
            throw new Error('Post not found');
        } else return res.json({ payload: { results: posts } });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
