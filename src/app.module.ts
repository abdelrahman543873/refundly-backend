import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';

@Module({
  imports: [ConfigurationModule, ExpenseModule],
})
export class AppModule {}
