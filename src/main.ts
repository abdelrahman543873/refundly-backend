import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MainValidationPipe } from './shared/pipes/main-validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('🚀refundly task')
    .setDescription('refundly description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(MainValidationPipe);
  await app.listen(3000);
}
bootstrap();
