import { Module } from "@nestjs/common";
import { UserStateService } from "./user-state.service";
import { UserStateController } from "./user-state.controller";

@Module({
  controllers: [UserStateController],
  providers: [UserStateService],
  exports: [UserStateService],
})
export class UserStateModule {}
