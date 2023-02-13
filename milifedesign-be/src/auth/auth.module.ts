import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { NetWorthsModule } from "src/net-worths/net-worths.module";

export const jwtSecret = "mango1banana2";

@Module({
  imports: [
    PassportModule,
    NetWorthsModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: "200d", issuer: "use" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
