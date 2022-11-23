import { Request } from 'express';
import prisma from '../../../../lib/prisma';
import { APIJson } from '../../../../lib/types/types';

export const updatePreferences = async (req: Request, res: APIJson) => {
    const { preferredLibrary } = req.body;
    const user = req.user;
    try {
        const added = await prisma.user.update({
            where: {
                id: user?.id,
            },
            data: {
                preferences: {
                    preferredLibrary,
                },
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
