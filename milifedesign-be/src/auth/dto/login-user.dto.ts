//src/auth/dto/login.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  googleId: string;
}
