declare namespace NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: string;
    PORT: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRE_TIME : string;
  }
}
