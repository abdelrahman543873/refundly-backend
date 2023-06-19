import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from './expense.repository';
import { AddExpenseDto } from './dtos/add-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}
  addExpense(addExpenseDto: AddExpenseDto) {
    return this.expenseRepository.addExpense(addExpenseDto);
  }
}
