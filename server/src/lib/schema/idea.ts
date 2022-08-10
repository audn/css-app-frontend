import { boolean, object, string, TypeOf } from 'zod';

export const createIdeaSchema = object({
    body: object({
        message: string({
            required_error: 'Description is required.',
        }).min(5, 'Minimum length 5 characters.'),
        user: object({
            verified: boolean(),
            username: string(),
            name: string(),
            profile_image_url: string(),
        }).optional(),
    }),
});

export const getIdea = object({
    params: object({
        id: string(),
    }),
});
export type CreateIdea = TypeOf<typeof createIdeaSchema>;
export type GetIdea = TypeOf<typeof getIdea>;
