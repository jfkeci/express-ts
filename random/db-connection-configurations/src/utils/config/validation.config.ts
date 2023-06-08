import * as Joi from 'joi';

export const validation = (): Joi.ObjectSchema<any> =>
  Joi.object({
    PORT: Joi.number().default(12256),
    NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
  });
