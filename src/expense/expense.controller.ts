import { Body, Controller, Post, Get } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AddExpenseDto } from './dtos/add-expense.dto';
import { Expense } from './expense.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('expense')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async addExpense(@Body() addExpenseDto: AddExpenseDto): Promise<Expense> {
    return await this.expenseService.addExpense(addExpenseDto);
  }

  @Get()
  async getExpenses(): Promise<Expense[]> {
    return await this.expenseService.getExpenses();
  }
}
