import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ConflictException,
  BadRequestException,
} from "@nestjs/common/exceptions";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { Auth } from "./entities/auth.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
import { PrismaService } from "../utils/prisma/prisma.service";
import { NetWorthsService } from "src/net-worths/net-worths.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly netWorthService: NetWorthsService
  ) {}

  async login(
    email: string,
    password: string,
    googleId: string
  ): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    if (googleId === null || googleId === undefined || googleId === "") {
      const passwordValid = await bcrypt
        .compare(password, user.password)
        .then(function (result: boolean) {
          return result;
        });

      if (!passwordValid) {
        throw new UnauthorizedException("Invalid password");
      }

      return {
        accessToken: this.jwtService.sign({
          userId: user.id,
          email: user.email,
          userName: user.name,
          surname: user.surname,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          netWorthId: user.netWorthId,
          superSecurityActivation: true,
        }),
      };
    } else {
      const googleIdValid = user.googleId === googleId;

      if (!googleIdValid) {
        throw new UnauthorizedException(
          "Please signup with Google, first to continue."
        );
      }

      return {
        accessToken: this.jwtService.sign({
          userId: user.id,
          email: user.email,
          userName: user.name,
          surname: user.surname,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          netWorthId: user.netWorthId,
          superSecurityActivation: true,
        }),
      };
    }
  }

  async register(data: RegisterUserDto): Promise<Auth> {
    const prismaClient = this.prisma;
    const takenUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (
      takenUser !== undefined &&
      takenUser !== null &&
      takenUser.googleId === data.email
    ) {
      throw new ConflictException("Email taken");
    }

    if (
      takenUser !== undefined &&
      takenUser !== null &&
      takenUser.googleId !== data.googleId &&
      data.googleId === data.email
    ) {
      const googlePassword = data.googleId;
      const user: User = await bcrypt
        .hash(googlePassword, 10)
        .then(async function (hash: any) {
          return await prismaClient.user.update({
            where: { id: takenUser.id },
            data,
          });
        });

      if (!user) {
        throw new BadRequestException("Failed updating user");
      }

      return {
        accessToken: this.jwtService.sign({
          userId: user.id,
          userName: user.name,
          surname: user.surname,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          netWorthId: user.netWorthId,
          superSecurityActivation: true,
        }),
      };
    }
    const user: User = await bcrypt
      .hash(data.password, 10)
      .then(async function (hash: any) {
        return await prismaClient.user.create({
          data: {
            email: data.email,
            name: data.name,
            surname: data.surname,
            password: hash,
            googleId: "",
          },
        });
      });

    if (!user) throw new BadRequestException("Failed creating user");

    await this.netWorthService.create({
      currentWorth: 0,
      startWorth: 0,
      predictionToGoal: new Date(),
      user: user.id,
    });

    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
        userName: user.name,
        surname: user.surname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        superSecurityActivation: true,
      }),
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return user;
  }
}
