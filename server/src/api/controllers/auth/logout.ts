import { Request } from 'express';
import { APIJson } from '../../../lib/types/types';

const logout = async (req: Request, res: APIJson) => {
    //@ts-ignore
    req.session.destroy((err) => {
        if (err) {
            console.log(err.message);

            return res.status(400).json({
                error: err.message,
            });
        } else {
            return res.status(200).json({});
        }
    });
};

export default logout;
