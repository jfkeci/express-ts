import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsString,
  IsArray,
  IsUUID,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNetWorthDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  goal?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  currentWorth?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  startWorth?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  predictionToGoal?: Date;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  user: string;
}
