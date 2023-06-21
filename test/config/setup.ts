import { Test } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../../src/app.module';
import { useContainer } from 'class-validator';
import { MainValidationPipe } from '../../src/shared/pipes/main-validation.pipe';
import { UserRepository } from '../../src/user/user.repository';
import { ExpenseRepository } from '../../src/expense/expense.repository';
import { BaseHttpExceptionFilter } from '../../src/shared/exception-filters/base-http.exception-filter';
import { CompanyRepository } from '../../src/company/company.repository';

export default async (): Promise<void> => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = module.createNestApplication<NestExpressApplication>();
  app.enable('trust proxy');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(MainValidationPipe);
  app.useGlobalFilters(new BaseHttpExceptionFilter());
  await app.init();
  global.app = app;
  global.userRepository = app.get(UserRepository);
  global.expenseRepository = app.get(ExpenseRepository);
  global.companyRepository = app.get(CompanyRepository);
};
