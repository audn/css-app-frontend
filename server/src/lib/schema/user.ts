import { any, boolean, object, string, TypeOf, z } from 'zod';

export const newUserSchema = object({
    body: object({
        verified: boolean(),
        username: string(),
        profile_image_url: string(),
        name: string(),
        id: string(),
        ideas: any(),
    }),
});
const methods = ['ADMIN', 'USER'] as const;

export const updateUserRole = object({
    body: object({
        id: string(),
        role: z.enum(methods),
    }),
});

export type NewUser = TypeOf<typeof newUserSchema>;
export type UpdateUserRole = TypeOf<typeof updateUserRole>;
