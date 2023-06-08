import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DevTestService } from "./dev-test.service";

@Module({
  imports: [JwtModule],
  providers: [DevTestService],
})
export class DevTestModule {}
