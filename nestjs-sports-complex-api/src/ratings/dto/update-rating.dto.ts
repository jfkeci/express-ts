import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRatingDto {
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsString()
  @IsNotEmpty()
  rating: number;
}
