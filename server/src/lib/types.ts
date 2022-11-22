import { Response } from 'express';

type Send<T = Response> = (body?: APIResponse) => T;

export interface APIJson extends Response {
    json: Send<this>;
}

export interface APIResponse {
    payload?: {
        [key: string]: any;
    };
    error?: string;
    message?: string;
}

export type IUserRoles = 'ADMIN' | 'USER' | 'MOD';
export declare namespace Twitter {
    export interface User {
        id: string;
        profile_image_url: string;
        name: string;
        username: string;
    }
}
