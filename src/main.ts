import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MainValidationPipe } from './shared/pipes/main-validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseHttpExceptionFilter } from './shared/exception-filters/base-http.exception-filter';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle('🚀refundly task')
    .setDescription('refundly description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new BaseHttpExceptionFilter());
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(MainValidationPipe);
  await app.listen(3000);
}
bootstrap();
