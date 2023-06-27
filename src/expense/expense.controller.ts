import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Inject,
  Put,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AddExpenseDto } from './dtos/add-expense.dto';
import { Expense } from './expense.entity';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RequestContext } from '../shared/interfaces/request-context.interface';
import { REQUEST } from '@nestjs/core';
import { ResolveExpenseDto } from './dtos/resolve-expense.dto';
import { RoleGuard } from '../shared/guards/role.guard';
import { HasRoles } from '../shared/guards/roles.metadata';
import { UserRoleEnum } from '../user/user.enum';

@UseGuards(AuthGuard)
@ApiTags('expense')
@Controller('expenses')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Get()
  async getExpenses(): Promise<Expense[]> {
    return await this.expenseService.getExpenses(this.request.user.id);
  }

  @Get('summary')
  async summary() {
    return await this.expenseService.summary(this.request.user.id);
  }

  @ApiBearerAuth()
  @HasRoles(UserRoleEnum.OWNER, UserRoleEnum.ADMIN)
  @UseGuards(RoleGuard)
  @Put('/resolve')
  async resolve(@Body() resolveExpenseDto: ResolveExpenseDto) {
    return (await this.expenseService.resolve(resolveExpenseDto))[1][0];
  }
}
