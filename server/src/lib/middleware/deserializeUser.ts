import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt';

const deserializeUse = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, 'headers.authorization', '').replace(
        /^Bearer\s/,
        ''
    );

    if (!accessToken) {
        return next();
    }

    const { decoded } = verifyJwt(accessToken);

    if (decoded) {
        const { user } = decoded as { user: string };

        res.locals.userId = user;

        return next();
    }

    return next();
};
export default deserializeUse;
