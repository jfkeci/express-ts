import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsNumber()
  @IsNotEmpty()
  rating: number;
  @IsString()
  @IsNotEmpty()
  classId: string;
}
