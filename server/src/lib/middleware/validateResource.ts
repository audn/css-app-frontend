import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

const validateResource =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    err,
                });
            }
        }
    };

export default validateResource;
