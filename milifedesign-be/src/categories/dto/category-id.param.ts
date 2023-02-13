import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { UserState } from "src/user-state/user-state.service";

export class CategoryIdParam {
  @IsUUID(undefined, { message: '"categoryId" should be a valid uuid' })
  @IsNotEmpty({ message: '"categoryId" should not be empty' })
  @ApiProperty({ description: "String, UUID, Required" })
  categoryId: string;

  @IsUUID(undefined, { message: '"userId" should be a valid uuid' })
  @IsNotEmpty({ message: '"userId" should not be empty' })
  @ApiProperty({ description: "String, UUID, Required" })
  userId: string;

  @IsEnum(UserState, {
    message: `"stateId" should be of values ${Object.values(UserState).join(
      ", "
    )}`,
  })
  @IsNotEmpty({ message: '"stateId" should not be empty' })
  @ApiProperty({
    description: "String, UUID, Required",
    enum: UserState,
    isArray: false,
  })
  stateId: UserState;
}
