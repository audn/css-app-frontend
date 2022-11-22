import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { CreateIdea } from '../../../lib/schema/idea';

export const post = async (
    req: Request<{}, {}, CreateIdea['body']>,
    res: any
) => {
    const userId = res.locals.userId;
    const posted = await prisma.idea.create({
        data: {
            ...req.body,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
        include: {
            user: true,
            upvotes: true,
        },
    });

    if (posted) {
        return res.json({
            payload: { results: posted },
        });
    } else return res.status(400).json({ message: 'Failed to post' });
};
export default post;
