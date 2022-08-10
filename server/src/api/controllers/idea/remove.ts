import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { UpdateIdea } from '../../../lib/schema/idea';
import { APIJson } from '../../../lib/types';

export const remove = async (
    req: Request<UpdateIdea['params']>,
    res: APIJson
) => {
    const ideaId = req.params.id;

    const idea = await prisma.idea.findUnique({
        where: {
            id: ideaId,
        },
        include: {
            user: true,
            upvotes: true,
        },
    });

    if (!idea) return res.status(404).json({ error: 'Not found' });

    const deletedIdea = await prisma.idea.delete({
        where: {
            id: ideaId,
        },
    });
    if (deletedIdea) res.json({ message: 'Deleted' });
    else res.status(400).json({ error: 'Failed to delete' });
};
