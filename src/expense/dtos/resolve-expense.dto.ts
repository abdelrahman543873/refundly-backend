import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { ExpenseStatus } from '../expense.enum';

export class ResolveExpenseDto {
  @IsEnum(ExpenseStatus)
  status!: ExpenseStatus;

  @IsPositive()
  @IsInt()
  id!: number;
}
