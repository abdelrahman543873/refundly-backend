import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expense } from './expense.entity';
import { ExpenseRepository } from './expense.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utilities/multer-file-name.util';

@Module({
  imports: [
    SequelizeModule.forFeature([Expense]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client/expenses',
        filename,
      }),
    }),
  ],
  providers: [ExpenseService, ExpenseRepository],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
