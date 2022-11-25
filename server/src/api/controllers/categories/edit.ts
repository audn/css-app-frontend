import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const editCategory = async (req: Request, res: APIJson) => {
    const value = req.params.value;

    try {
        const category = await prisma.category.findUnique({
            where: {
                value,
            },
        });
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            const edited = await prisma.category.update({
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
                res.status(400).json({ error: 'Failed to update category' });
            }
        }
    } catch (error: any) {
        res.status(400).json({
            error: error.message,
        });
    }
};
