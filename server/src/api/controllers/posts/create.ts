import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const createPost = async (req: Request, res: APIJson) => {
    const userId = req?.user?.id;
    const {
        title,
        animated,
        author,
        code,
        description,
        generatedImage,
        id,
        theme,
    } = req.body;
    try {
        //TODO: check if category exists before adding
        const added = await prisma.post.create({
            data: {
                userId: {
                    connect: {
                        id: userId,
                    },
                },
                categoryId: {
                    connect: {
                        value: req.body.category,
                    },
                },
                title,
                animated,
                author,
                code,
                description,
                generatedImage,
                id,
                theme,
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
