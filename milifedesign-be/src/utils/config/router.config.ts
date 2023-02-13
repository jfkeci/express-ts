import { UsersModule } from "src/users/users.module";
import { UserStateModule } from "src/user-state/user-state.module";
import { CategoriesModule } from "src/categories/categories.module";
import { NetWorthsModule } from "src/net-worths/net-worths.module";
import { PaymentsModule } from "src/payments/payments.module";

export const routerConfig = [
  {
    path: "users",
    module: UsersModule,
    children: [
      {
        path: ":userId/states/:stateId",
        module: UserStateModule,
        children: [
          {
            path: "categories",
            module: CategoriesModule,
          },
          {
            path: "net-worth",
            module: NetWorthsModule,
            children: [
              {
                path: ":netWorthId/payments",
                module: PaymentsModule,
              },
            ],
          },
        ],
      },
    ],
  },
];
