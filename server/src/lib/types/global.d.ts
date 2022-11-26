import { IUser } from './types';

declare global {
    namespace Express {
        export interface User extends IUser.User {}
    }
}
export {};
