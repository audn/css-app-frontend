import { Request, Response } from 'express';
import prisma from '../../../lib/prisma';
import { UpdateUserRole } from '../../../lib/schema/user';
import { IUserRoles } from '../../../lib/types/types';

export const changeRole = async (
    req: Request<UpdateUserRole['body']>,
    res: Response
) => {
    const userId = req.params.id;
    const { give } = req.query as { [key: string]: IUserRoles };

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) throw new Error('User not found');

    const updatedUser = await prisma.user.update({
        data: {
            role: give,
        },
        where: {
            id: userId,
        },
    });
    return res.json({ payload: { results: updatedUser } });
};
