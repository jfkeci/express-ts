import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsNotEmpty } from "class-validator";
import { CreateNetWorthDto } from "./create-net-worth.dto";

export class UpdateNetWorthDto extends PartialType(CreateNetWorthDto) {
  @IsOptional()
  @ApiProperty({ required: false })
  goal?: number;

  @IsOptional()
  @ApiProperty()
  current_worth: number;

  @IsOptional()
  @ApiProperty()
  prediction_to_goal: Date;
}
