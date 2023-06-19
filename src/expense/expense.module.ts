import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expense } from './expense.entity';
import { ExpenseRepository } from './expense.repository';

@Module({
  imports: [SequelizeModule.forFeature([Expense])],
  providers: [ExpenseService, ExpenseRepository],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
