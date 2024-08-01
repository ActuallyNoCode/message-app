import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './services/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3100;
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {});

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
