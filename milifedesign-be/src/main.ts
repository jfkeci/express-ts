import { PrismaModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PrismaClientExceptionFilter } from "./prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(PrismaModule);

  app.enableCors();

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle("Personal Finance and Productivity Application - Back End")
    .setDescription(
      "The back-end solution for a desktop management application"
    )
    .setVersion("0.1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document, { customSiteTitle: "Back End" });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
