import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from './expense.repository';
import { AddExpenseDto } from './dtos/add-expense.dto';
import { ResolveExpenseDto } from './dtos/resolve-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}
  addExpense(
    addExpenseDto: AddExpenseDto,
    userId: number,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.expenseRepository.addExpense(
      addExpenseDto,
      userId,
      attachments,
    );
  }

  getExpenses(userId: number) {
    return this.expenseRepository.getExpenses(userId);
  }

  resolve(resolveExpenseDto: ResolveExpenseDto) {
    return this.expenseRepository.resolve(resolveExpenseDto);
  }
}
