import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SportsModule } from './sports/sports.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SportsClassesModule } from './sports-classes/sports-classes.module';
import { RatingsModule } from './ratings/ratings.module';

console.log(process.env.DB_USER)

@Module({
  imports: [
    SportsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gg0cz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    ),
    EnrollmentsModule,
    UserModule,
    AuthModule,
    SportsClassesModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

