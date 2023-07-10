import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCompanyInfoDto {
  @IsInt()
  @Type(() => Number)
  id?: number;
}
