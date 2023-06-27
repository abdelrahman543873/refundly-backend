import {
  Allow,
  IsEnum,
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '../expense.enum';

export class AddExpenseDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  value!: number;

  @IsISO4217CurrencyCode()
  currency!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ExpenseCategory)
  category!: ExpenseCategory;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @Allow()
  attachments?: string[];
}
