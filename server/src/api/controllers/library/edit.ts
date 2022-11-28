import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const editLibrary = async (req: Request, res: APIJson) => {
    const value = req.params.value;

    try {
        const library = await prisma.library.findUnique({
            where: {
                value,
            },
        });

        if (!library) {
            res.status(404).json({ error: 'Library not found' });
        } else {
            const edited = await prisma.library.update({
                where: {
                    value,
                },
                data: {
                    ...req.body,
                },
            });
            if (edited) {
                return res.json({ payload: { results: edited } });
            } else {
                res.status(400).json({ error: 'Failed to update library' });
            }
        }
    } catch (error: any) {
        console.log(error.message);

        res.status(400).json({
            error: error.message,
        });
    }
};
