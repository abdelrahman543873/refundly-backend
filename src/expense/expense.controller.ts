import { Body, Controller, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AddExpenseDto } from './dtos/add-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async addExpense(@Body() addExpenseDto: AddExpenseDto) {
    return await this.expenseService.addExpense(addExpenseDto);
  }
}
