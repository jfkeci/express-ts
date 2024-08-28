import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Inject, Injectable } from "@nestjs/common";
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/utils/prisma/prisma.service";

@Injectable()
export class DevTestService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger
  ) {
    const environment = this.config.get("environment");
    const testEmail = this.config.get("test_email");

    if (environment && testEmail && environment === "development") {
      setTimeout(async () => {
        await this.generateJwt(testEmail);
      }, 2000);
    }
  }

  async generateJwt(email: string) {
    let user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      const password = await bcrypt.hash("test1234", 10);

      user = await this.prisma.user.create({
        data: {
          email,
          name: "Test",
          surname: "Tester",
          password,
        },
      });
    }

    const accessToken = await this.jwtService.sign(
      { email: user.email, id: user.id },
      { secret: this.config.get("jwt_secret") }
    );

    this.logger.log("info", accessToken);

    return { accessToken };
  }
}
