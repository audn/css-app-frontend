declare global {
    namespace NodeJS {
        interface ProcessEnv {
            FRONTEND_URL: string;
            API_URL: string;
            DATABASE_URL: string;
        }
    }
}

export {};
