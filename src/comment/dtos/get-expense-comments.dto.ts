import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetExpenseComments {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  expenseId: number;
}
