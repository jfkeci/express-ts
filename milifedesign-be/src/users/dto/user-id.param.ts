import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UserIdParam {
  @IsUUID(undefined, { message: '"userId" should be a valid uuid' })
  @IsNotEmpty({ message: '"userId" should not be empty' })
  @ApiProperty({ description: "String, UUID, Required" })
  userId: string;
}
