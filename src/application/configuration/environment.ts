import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const PORT = process.env.PORT;
export const ENVIRONMENT = process.env.NODE_ENV;
const PROD = ENVIRONMENT === 'production';

export const MONGODB_URI = PROD
  ? process.env.MONGO_URI_PRODUCTION
  : process.env.MONGO_URI_DEVELOPMENT;

export const JWT_SECRET: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
