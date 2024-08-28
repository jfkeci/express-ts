import { validation } from "./validation.config";
import { ConfigModuleOptions } from "@nestjs/config";

const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: { url: process.env.DATABASE_URL },
  environment: process.env.ENVIRONMENT,
  jwt_secret: process.env.JWT_SECRET,
  test_email: process.env.TEST_EMAIL,
});

export const envConfig = (): ConfigModuleOptions => {
  return <ConfigModuleOptions>{
    isGlobal: true,
    envFilePath: ".env",
    validationSchema: validation(),
    load: [configuration],
  };
};
