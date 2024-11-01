import { config } from "dotenv";
import Joi from "joi";

config();

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  RABBIT_URL: Joi.string().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  JWT_SECRET,
  JWT_EXPIRATION,
  RABBIT_URL,
} = envVars;

interface Env {
  port: {
    PORT: number;
  };
  db: {
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
  };
  jwt: {
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  };
  rabbitmq: {
    RABBIT_URL: string;
  };
}

export const env: Env = {
  port: {
    PORT: PORT,
  },
  db: {
    DB_USER: DB_USER,
    DB_PASSWORD: DB_PASSWORD,
    DB_NAME: DB_NAME,
    DB_HOST: DB_HOST,
    DB_PORT: DB_PORT,
  },
  jwt: {
    JWT_SECRET: JWT_SECRET,
    JWT_EXPIRATION: JWT_EXPIRATION,
  },
  rabbitmq: {
    RABBIT_URL: RABBIT_URL,
  },
};
