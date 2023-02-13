import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class NetWorthIdParam {
  @IsUUID(undefined, { message: '"netWorthId" should be a valid uuid' })
  @IsNotEmpty({ message: '"netWorthId" should not be empty' })
  @ApiProperty({ description: "String, UUID, Required" })
  netWorthId: string;
}
