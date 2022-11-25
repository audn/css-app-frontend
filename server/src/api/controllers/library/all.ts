import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const allLibraries = async (req: Request, res: APIJson) => {
    try {
        const libs = await prisma.library.findMany({
            include: {
                _count: {
                    select: {
                        posts: true,
                    },
                },
            },
        });
        if (!libs) {
            throw new Error('No libraries');
        } else
            return res.json({
                payload: { results: libs },
            });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
