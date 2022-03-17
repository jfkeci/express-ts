import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  verificationCode: string;
}
