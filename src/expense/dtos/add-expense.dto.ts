import {
  Allow,
  IsISO4217CurrencyCode,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @Allow()
  attachments?: string[];
}
