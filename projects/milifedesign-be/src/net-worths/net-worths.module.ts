import { Module } from "@nestjs/common";
import { NetWorthsService } from "./net-worths.service";
import { NetWorthsController } from "./net-worths.controller";
import { UserStateModule } from "src/user-state/user-state.module";

@Module({
  imports: [UserStateModule],
  controllers: [NetWorthsController],
  providers: [NetWorthsService],
  exports: [NetWorthsService],
})
export class NetWorthsModule {}
