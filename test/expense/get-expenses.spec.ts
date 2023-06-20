import { expenseFactory } from './expense.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { EXPENSES } from '../endpoints/expense.endpoints';
import { userFactory } from '../user/user.factory';

describe('get Expenses suite case', () => {
  it('should get expenses successfully', async () => {
    const user = await userFactory();
    await expenseFactory({ userId: user.id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: EXPENSES,
      token: user.token,
    });
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
