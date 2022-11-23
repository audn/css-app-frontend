declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      FRONTEND_URL: string;
      REDIS_URI: string;
      DATABASE_URL: string;
      TWITTER_CLIENT_SECRET: string;
      API_KEY: string;
      API_SECRET: string;
      PRIVATE_KEY: string;
      PUBLIC_KEY: string;
    }
  }
}

export {}
