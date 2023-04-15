import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './services/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      /^http:\/\/localhost:3000$/, // Add localhost:3000 as a regex
      /^http:\/\/localhost:[0-9]{1,}$/, // Update regex for other localhost ports
      'https://jury-dao-web.vercel.app',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

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
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' },
        'accessToken',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // start
    await app.listen(process.env.PORT);
  }
}

bootstrap();
