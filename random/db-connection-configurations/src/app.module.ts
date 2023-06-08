import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { envConfig } from './utils/config/env.config';

@Module({
  imports: [ConfigModule.forRoot(envConfig())],
  controllers: [AppController],
})
export class AppModule {}
