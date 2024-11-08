import { config } from "dotenv";
import Joi from "joi";

config();

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  USERS_SERVICE_URL: Joi.string().uri().required(),
  NOTIFICATIONS_SERVICE_URL: Joi.string().uri().required(),
  PAYMENTS_SERVICE_URL: Joi.string().uri().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  PORT,
  USERS_SERVICE_URL,
  NOTIFICATIONS_SERVICE_URL,
  PAYMENTS_SERVICE_URL,
} = envVars;

interface Env {
  port: {
    PORT: number;
  };
  services: {
    USERS_SERVICE_URL: string;
    NOTIFICATIONS_SERVICE_URL: string;
    PAYMENTS_SERVICE_URL: string;
  };
}

export const env: Env = {
  port: {
    PORT: PORT,
  },
  services: {
    USERS_SERVICE_URL: USERS_SERVICE_URL,
    NOTIFICATIONS_SERVICE_URL: NOTIFICATIONS_SERVICE_URL,
    PAYMENTS_SERVICE_URL: PAYMENTS_SERVICE_URL,
  },
};
