import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PrismaService } from "./services/prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // swagger
  const docsEnabledEnvs = ['local', 'dev'];
  if (docsEnabledEnvs.includes(process.env.ENVIRONMENT)) {
    const config = new DocumentBuilder()
      .setTitle('Jury DAO API DOCS')
      .setDescription('Jury DAO API DOCS')
      .setVersion('0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // start
    await app.listen(process.env.PORT);
  }
}

bootstrap();
