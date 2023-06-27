import {
  Allow,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AddCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @Allow()
  attachments?: string[];

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  expenseId: number;
}
