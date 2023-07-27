import { ConfigProps } from "./config.interface";

export const configuration = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  // api: {
  //   apiUrl: process.env.API_URL,
  //   httpTimeout: 1000,
  // },
  // mongodb: {
  //   database: {
  //     connectionString: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017',
  //     databaseName: process.env.NODE_ENV || 'local'
  //   }
  // }
});