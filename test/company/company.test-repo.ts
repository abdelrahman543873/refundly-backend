import { CompanyRepository } from '../../src/company/company.repository';

export const companyRepo = (): CompanyRepository => global.companyRepository;
