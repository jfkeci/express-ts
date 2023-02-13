import * as Joi from "joi";

export const validation = (): Joi.ObjectSchema<any> =>
  Joi.object({
    PORT: Joi.number().default(3000),
    ENVIRONMENT: Joi.string().default("mango1banana2"),
    JWT_SECRET: Joi.string().default("development"),
    DATABASE_URL: Joi.string().exist(),
  });
