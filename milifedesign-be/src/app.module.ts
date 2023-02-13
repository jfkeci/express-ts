import { RouterModule } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { ConfigModule } from "@nestjs/config";
import { Global, Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { envConfig } from "./utils/config/env.config";
import { PaymentsModule } from "./payments/payments.module";
import { loggerConfig } from "./utils/config/logger.config";
import { routerConfig } from "./utils/config/router.config";
import { PrismaService } from "./utils/prisma/prisma.service";
import { NetWorthsModule } from "./net-worths/net-worths.module";
import { CategoriesModule } from "./categories/categories.module";
import { UserStateModule } from "./user-state/user-state.module";
import { ProjectsModule } from './projects/projects.module';
import { DevTestModule } from './dev-test/dev-test.module';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot(loggerConfig("debug")),
    RouterModule.register(routerConfig),
    ConfigModule.forRoot(envConfig()),
    CategoriesModule,
    UserStateModule,
    NetWorthsModule,
    PaymentsModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    DevTestModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
