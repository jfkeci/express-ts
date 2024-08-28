import {
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsDateString,
  IsNumber,
  IsBoolean,
  IsUUID,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "@prisma/client";

export class CreatePaymentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsPositive()
  parts?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsPositive()
  partsPayed?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  timeBasis?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  canceled?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  overdue?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  transactionType: TransactionType;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  netWorth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  category: string;
}
