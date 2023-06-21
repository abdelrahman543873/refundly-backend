import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [ConfigurationModule, ExpenseModule, UserModule, CompanyModule],
})
export class AppModule {}
