import { TestingModule } from '@nestjs/testing';
import { ExpenseRepository } from '../../src/expense/expense.repository';

export const ExpenseRepo = (): ExpenseRepository =>
  (global.app as TestingModule).get<ExpenseRepository>(ExpenseRepository);
