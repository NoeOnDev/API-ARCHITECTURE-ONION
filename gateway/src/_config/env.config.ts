import { config } from "dotenv";
import Joi from "joi";

config();

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  JWT_EXPIRATION_TEMP: Joi.string().required(),
  USERS_SERVICE_URL: Joi.string().uri().required(),
  NOTIFICATIONS_SERVICE_URL: Joi.string().uri().required(),
  CASES_SERVICE_URL: Joi.string().uri().required(),
  PAYMENTS_SERVICE_URL: Joi.string().uri().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  PORT,
  JWT_SECRET,
  JWT_EXPIRATION,
  JWT_EXPIRATION_TEMP,
  USERS_SERVICE_URL,
  NOTIFICATIONS_SERVICE_URL,
  CASES_SERVICE_URL,
  PAYMENTS_SERVICE_URL,
} = envVars;

interface Env {
  port: {
    PORT: number;
  };
  jwt: {
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    JWT_EXPIRATION_TEMP: string;
  };
  services: {
    USERS_SERVICE_URL: string;
    NOTIFICATIONS_SERVICE_URL: string;
    CASES_SERVICE_URL: string;
    PAYMENTS_SERVICE_URL: string;
  };
}

export const env: Env = {
  port: {
    PORT: PORT,
  },
  jwt: {
    JWT_SECRET: JWT_SECRET,
    JWT_EXPIRATION: JWT_EXPIRATION,
    JWT_EXPIRATION_TEMP: JWT_EXPIRATION_TEMP,
  },
  services: {
    USERS_SERVICE_URL: USERS_SERVICE_URL,
    NOTIFICATIONS_SERVICE_URL: NOTIFICATIONS_SERVICE_URL,
    CASES_SERVICE_URL: CASES_SERVICE_URL,
    PAYMENTS_SERVICE_URL: PAYMENTS_SERVICE_URL,
  },
};
