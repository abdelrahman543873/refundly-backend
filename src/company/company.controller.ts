import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetCompanyInfoDto } from './dtos/get-company-info.dto';
import { CompanyService } from './company.service';
import { AuthGuard } from '../shared/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('info/:id')
  async getCompanyInfo(@Param() getCompanyInfoDto: GetCompanyInfoDto) {
    return await this.companyService.getCompanyInfo(getCompanyInfoDto);
  }
}
