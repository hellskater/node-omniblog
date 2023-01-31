import { DB_PASSWORD } from '@config';

export const dbConnection = {
  // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  url: `mongodb+srv://admin:${DB_PASSWORD}@cluster0.bcegpwd.mongodb.net/?retryWrites=true&w=majority`,
};
