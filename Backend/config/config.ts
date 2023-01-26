import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.resolve(path.dirname(''), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    MONGO_URI: Joi.string().required().description('Mongo DB url'),
    BACKEND_URL: Joi.string().required().description('Backend url'),
    CLIENT_URL: Joi.string().required().description('Client url'),
    SESSION_SECRET: Joi.string().required().description('Session secret'),
    RECAPTCHA_SECRET_KEY: Joi.string()
      .required()
      .description('Recaptcha secret key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseUri:
    envVars.MONGO_URI + (envVars.NODE_ENV === 'test' ? '-test' : ''),
  backendUrl: envVars.BACKEND_URL,
  clientUrl: envVars.CLIENT_URL,
  sessionSecret: envVars.SESSION_SECRET,
  recaptchaSecretKey: envVars.RECAPTCHA_SECRET_KEY,
};

export default config;
