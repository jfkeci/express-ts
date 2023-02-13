import { validation } from './validation.config';
import { ConfigModuleOptions } from '@nestjs/config';

const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  node_env: process.env.NODE_ENV,
});

export const envConfig = (): ConfigModuleOptions => {
  return <ConfigModuleOptions>{
    isGlobal: true,
    envFilePath: '.env',
    validationSchema: validation(),
    load: [configuration],
  };
};
