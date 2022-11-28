import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const removeLibrary = async (req: Request, res: APIJson) => {
    const value = req.params.value;

    try {
        const library = await prisma.library.delete({
            where: {
                value,
            },
        });
        if (!library) {
            res.status(404).json({ error: 'Library not found' });
        } else return res.json({ message: 'Deleted library' });
    } catch (error: any) {
        console.log(error.message);

        res.status(400).json({
            error: error.message,
        });
    }
};
