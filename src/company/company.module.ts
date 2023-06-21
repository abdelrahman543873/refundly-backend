import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './company.entity';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  providers: [CompanyService],
})
export class CompanyModule {}
