import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AddExpenseDto } from './dtos/add-expense.dto';
import { Expense } from './expense.entity';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('expense')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachments'))
  @Post()
  async addExpense(
    @Body() addExpenseDto: AddExpenseDto,
    @UploadedFiles() attachments: Array<Express.Multer.File>,
  ): Promise<Expense> {
    return await this.expenseService.addExpense(addExpenseDto, attachments);
  }

  @Get()
  async getExpenses(): Promise<Expense[]> {
    return await this.expenseService.getExpenses();
  }
}
