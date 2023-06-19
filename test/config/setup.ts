import { Test } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../../src/app.module';
import { useContainer } from 'class-validator';
import { MainValidationPipe } from '../../src/shared/pipes/main-validation.pipe';

export default async (): Promise<void> => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = module.createNestApplication<NestExpressApplication>();
  app.enable('trust proxy');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(MainValidationPipe);
  await app.init();
  global.app = app;
};
