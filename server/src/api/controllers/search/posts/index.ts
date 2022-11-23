import { Request } from 'express';
import prisma from '../../../../lib/prisma';
import { APIJson } from '../../../../lib/types/types';

export const searchPosts = async (req: Request, res: APIJson) => {
    const { q, filter, category } = req.body as {
        q: string;
        filter: { animated: boolean; theme: 'light' | 'dark'; libary: string };
        category: string;
    };
    try {
        const query = q
            .split(' ')
            .map((x) => x)
            .join('|');

        const posts = await prisma.post.findMany({
            where: {
                title: {
                    search: query,
                },
                OR: {
                    description: {
                        search: query,
                    },
                },
                AND: {
                    library: {
                        equals: filter.libary,
                    },
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
