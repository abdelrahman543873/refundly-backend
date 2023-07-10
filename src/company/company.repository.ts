import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from '../shared/abstract/repository.abstract';
import { Company } from './company.entity';
import { GetCompanyInfoDto } from './dtos/get-company-info.dto';

@Injectable()
export class CompanyRepository extends BaseRepository<Company> {
  constructor(
    @InjectModel(Company)
    protected readonly model: typeof Company,
  ) {
    super(model);
  }

  getCompanyInfo(getCompanyInfoDto: GetCompanyInfoDto) {
    return this.model.findOne({ where: { ...getCompanyInfoDto } });
  }
}
