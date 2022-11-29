import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const createPost = async (req: Request, res: APIJson) => {
    const userId = req?.user?.id;
    const {
        title,
        animated,
        code,
        description,
        generatedImage,
        id,
        libraryVersion,
        theme,
        responsive,
    } = req.body;
    try {
        const category = await prisma.category.findUnique({
            where: { value: req.body.category },
        });

        if (!category) {
            return res.status(400).json({
                error: `Category ${req.body.category} does not exist.`,
            });
        } else {
            const added = await prisma.post.create({
                data: {
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                    categoryRelations: {
                        connect: {
                            value: req.body.category,
                        },
                    },
                    libraryRelations: {
                        connect: {
                            value: req.body.library,
                        },
                    },
                    title,
                    animated,
                    code,
                    responsive,
                    libraryVersion,
                    description,
                    generatedImage,
                    id,
                    theme,
                },
            });
            if (!added) {
                res.status(404).json({ error: 'Failed to add post' });
            } else return res.json({ payload: { results: added } });
        }
    } catch (error: any) {
        console.log(error.message);

        res.status(400).json({
            error: error.message,
        });
    }
};
