import { Request, Response } from 'express';

type Send<T = Response> = (body?: APIResponse) => T;

export interface APIJson extends Response {
    json: Send<this>;
}
export interface IGetUserAuthInfoRequest extends Request {
    user: string; // or any other type
}
export interface APIResponse {
    payload?: {
        [key: string]: any;
    };
    error?: string;
    message?: string;
}
export declare module IUser {
    export type Roles = 'ADMIN' | 'USER' | 'MOD';
    export interface User {
        id: string;
        twitterId?: string;
        discordId?: string;
        username: string;
        avatar: string;
        role: Roles;
        createdAt: string;
    }
}
export declare namespace ITwitter {
    export interface User {
        id: number;
        username: string;
        displayName: string;
        photos: [{ value: string }];
    }
}
