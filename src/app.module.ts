import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, ExpenseModule, UserModule],
})
export class AppModule {}
