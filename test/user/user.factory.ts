import { faker } from '@faker-js/faker';
import { userRepo } from './user.test-repo';
import { hashPass } from '../../src/shared/utilities/bcryptHelper.util';
import { generateAuthToken } from '../../src/shared/utilities/token.util';
import { UserRoleEnum } from '../../src//user/user.enum';

interface UserType {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  companyId?: number;
  role?: UserRoleEnum;
}

export const buildUserParams = (obj: UserType = {}): UserType => {
  return {
    name: obj.name || faker.person.firstName(),
    email: obj.email || faker.internet.email(),
    password: obj.password || faker.internet.password(),
    avatar: obj.avatar || faker.internet.url(),
    companyId: obj.companyId || null,
    role:
      obj.role ||
      (faker.helpers.arrayElement(Object.keys(UserRoleEnum)) as UserRoleEnum),
  };
};

export const userFactory = async (obj: UserType = {}) => {
  const params = buildUserParams(obj);
  const user = await userRepo().create({
    ...params,
    password: await hashPass(params.password),
  });
  user.token = generateAuthToken(user.id);
  return user;
};
