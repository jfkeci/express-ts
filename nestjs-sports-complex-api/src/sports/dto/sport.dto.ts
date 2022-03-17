import { IsNotEmpty, IsString } from 'class-validator';

export class SportDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
