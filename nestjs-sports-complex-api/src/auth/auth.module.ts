import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminJwtStrategy } from './strategy/admin.auth.strategy';
import { PublicJwtStrategy } from './strategy/public.auth.strategy';
import { UserJwtStrategy } from './strategy/user.auth.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'nest-sports-api-31k2maaAdS2Kl',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserJwtStrategy,
    AdminJwtStrategy,
    PublicJwtStrategy,
  ],
})
export class AuthModule {}
