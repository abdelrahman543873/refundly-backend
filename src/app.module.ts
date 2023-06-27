import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ConfigurationModule, ExpenseModule, UserModule, CompanyModule, CommentModule],
})
export class AppModule {}
