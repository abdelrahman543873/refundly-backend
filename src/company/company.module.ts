import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CompanyController } from './company.controller';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  providers: [CompanyService, CompanyRepository],
  controllers: [CompanyController],
})
export class CompanyModule {}
