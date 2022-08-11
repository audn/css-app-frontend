declare global {
      namespace NodeJS {
            interface ProcessEnv {
                  FRONTEND_URL: string;
                  API_URL: string;
                  DATABASE_URL: string;
                  TWITTER_CLIENT_ID: string;
                  TWITTER_CLIENT_SECRET: string;
                  API_KEY: string;
                  API_SECRET: string;
                  PRIVATE_KEY: string;
                  PUBLIC_KEY: string;
            }
      }
}

export {};
