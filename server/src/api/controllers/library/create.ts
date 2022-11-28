import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const addLibrary = async (req: Request, res: APIJson) => {
    try {
        const added = await prisma.library.create({
            data: {
                label: req.body.label,
                value: req.body.value,
                versions: req.body.versions,
            },
        });
        if (!added) {
            throw new Error('Failed to add library');
        } else return res.json({ payload: { results: added } });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
