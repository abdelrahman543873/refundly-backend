import { faker } from '@faker-js/faker';
import { userFactory } from 'test/user/user.factory';
import { companyRepo } from './company.test-repo';

interface CompanyType {
  name?: string;
  avatar?: string;
  ownerId?: number;
}

export const buildCompanyParams = async (
  obj: CompanyType = {},
): Promise<CompanyType> => {
  return {
    name: obj.name || faker.company.name(),
    avatar: obj.avatar || faker.image.url(),
    ownerId: obj.ownerId || (await userFactory()).id,
  };
};

export const companyFactory = async (obj: CompanyType = {}) => {
  const params = await buildCompanyParams(obj);
  return await companyRepo().create({
    ...params,
  });
};
