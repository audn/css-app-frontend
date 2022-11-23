import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
    //@ts-ignore
    req.session.destroy((err) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message,
            });
        } else {
            return res.status(200).json({});
        }
    });
};

export default logout;
