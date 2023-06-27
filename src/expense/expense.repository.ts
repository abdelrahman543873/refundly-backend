import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Expense } from './expense.entity';
import { AddExpenseDto } from './dtos/add-expense.dto';
import { BaseRepository } from '../shared/abstract/repository.abstract';
import { ExpenseStatus } from './expense.enum';
import { ResolveExpenseDto } from './dtos/resolve-expense.dto';
import { col, fn, literal } from 'sequelize';

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
    userId: number,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.model.create({
      userId,
      ...addExpenseDto,
      status: ExpenseStatus.REQUESTED,
      ...(attachments && {
        attachments: attachments.map((attachment) => {
          return `${process.env.APP_HOST}expenses/${attachment.filename}`;
        }),
      }),
    });
  }

  getExpenses(userId: number) {
    return this.model.findAll({ where: { userId } });
  }

  summary(userId: number) {
    return this.model.findAll({
      attributes: [[fn('SUM', col('value')), 'categoryTotal'], 'category'],
      group: ['category'],
      where: { userId },
    });
  }

  resolve(resolveExpenseDto: ResolveExpenseDto) {
    return this.model.update(
      {
        status: resolveExpenseDto.status,
      },
      {
        where: { id: resolveExpenseDto.id },
        returning: true,
      },
    );
  }
}
