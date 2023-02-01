import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_PASSWORD, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, REFRESH_SECRET_KEY } = process.env;
