import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AddExpenseDto } from './dtos/add-expense.dto';
import { Expense } from './expense.entity';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RequestContext } from '../shared/interfaces/request-context.interface';
import { REQUEST } from '@nestjs/core';

@UseGuards(AuthGuard)
@ApiTags('expense')
@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachments'))
  @Post()
  async addExpense(
    @Body() addExpenseDto: AddExpenseDto,
    @UploadedFiles() attachments: Array<Express.Multer.File>,
  ): Promise<Expense> {
    return await this.expenseService.addExpense(
      addExpenseDto,
      this.request.user.id,
      attachments,
    );
  }

  @Get()
  async getExpenses(): Promise<Expense[]> {
    return await this.expenseService.getExpenses(this.request.user.id);
  }
}
