import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { COMPANY_INFO } from '../endpoints/company.endpoints';
import { companyFactory } from './company.factory';

describe('get company info suite case', () => {
  it('should get company info successfully', async () => {
    const user = await userFactory();
    const company = await companyFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${COMPANY_INFO}/${company.id}`,
      token: user.token,
    });
    expect(res.body.name).toBe(company.name);
  });
});
