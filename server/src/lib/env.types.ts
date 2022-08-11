declare global {
      namespace NodeJS {
            interface ProcessEnv {
                  DATABASE_URL: string;
                  TWITTER_CLIENT_ID: string;
                  TWITTER_CLIENT_SECRET: string;
                  API_KEY: string;
                  API_SECRET: string;
                  PRIVATE_KEY: string;
                  PUBLIC_KEY: string;
                  NEXT_PUBLIC_API_URL: string;
            }
      }
}

export {};
