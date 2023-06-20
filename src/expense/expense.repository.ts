import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Expense } from './expense.entity';
import { AddExpenseDto } from './dtos/add-expense.dto';
import { BaseRepository } from '../shared/abstract/repository.abstract';

@Injectable()
export class ExpenseRepository extends BaseRepository<Expense> {
  constructor(
    @InjectModel(Expense)
    protected readonly model: typeof Expense,
  ) {
    super(model);
  }

  addExpense(
    addExpenseDto: AddExpenseDto,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.model.create({
      ...addExpenseDto,
      ...(attachments && {
        attachments: attachments.map((attachment) => {
          return `${process.env.APP_HOST}${attachment.filename}`;
        }),
      }),
    });
  }

  getExpenses() {
    return this.model.findAll();
  }
}
