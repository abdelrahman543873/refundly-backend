import { ExpenseRepository } from '../../src/expense/expense.repository';

export const ExpenseRepo = (): ExpenseRepository => global.expenseRepository;
