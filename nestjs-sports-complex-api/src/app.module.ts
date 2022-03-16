import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SportsModule } from './sports/sports.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gg0cz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    ),
    EnrollmentsModule,
    SportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

