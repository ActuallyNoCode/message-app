import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './services/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const port = process.env.PORT || 3100;
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes
  app.enableCors();

  // Sockets
  app.useWebSocketAdapter(new IoAdapter(app));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {});

  // Validates all DTOs
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port).then(() => {
    Logger.log('---------------------------------------------------------');
    Logger.log(
      `Swagger Docs running on http://localhost:${port}/docs`,
      'Bootstrap',
    );
    Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
  });
}
bootstrap();
