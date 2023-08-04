import { ConfigProps } from "./config.interface";

export const configuration = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 4000,
});