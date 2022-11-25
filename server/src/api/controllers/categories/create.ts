import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const addCategory = async (req: Request, res: APIJson) => {
    try {
        const added = await prisma.category.create({
            data: {
                label: req.body.label,
                value: req.body.value,
            },
        });
        if (!added) {
            throw new Error('Failed to add category');
        } else return res.json({ payload: { results: added } });
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
