import { CompanyRepository } from './company.repository';
import { GetCompanyInfoDto } from './dtos/get-company-info.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  getCompanyInfo(getCompanyInfoDto: GetCompanyInfoDto) {
    return this.companyRepository.getCompanyInfo(getCompanyInfoDto);
  }
}
