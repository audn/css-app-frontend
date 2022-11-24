import { Request, Response } from 'express';

type Send<T = Response> = (body?: APIResponse) => T;

export interface APIJson extends Response {
    json: Send<this>;
}

export interface APIRequest extends Request {
    json: Send<this>;
    user: IUser.User;
}
export interface APIResponse {
    payload?: {
        results: {
            [key: string]: any;
        };
        count?: number;
    };
    error?: string;
    message?: string;
}
export interface Category {
    label: string;
    value: string;
    _count: {
        linkedTemplates: number;
    };
}
export declare module IUser {
    export type Roles = 'ADMIN' | 'USER' | 'MOD';
    export interface User {
        id: string;
        twitterId?: string;
        discordId?: string;
        username: string;
        avatar: string;
        preferences: {
            preferredLibrary: string;
        };
        role: Roles;
        createdAt: string;
    }
}
export declare module IPost {
    export type Roles = 'ADMIN' | 'USER' | 'MOD';
    export interface Post {
        id: string;
        title: string;
        code: any;
        description: string;
        generatedImage?: string;
        animated: boolean;
        theme: string;

        author: IUser.User;
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
