import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  googleId: string;

  @IsOptional()
  @MaxLength(150)
  @ApiProperty({ required: false })
  surname?: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
