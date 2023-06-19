import { buildExpenseParams } from './expense.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { EXPENSES } from '../endpoints/expense.endpoints';

describe('get Expenses suite case', () => {
  it('should get expenses successfully', async () => {
    const expense = await buildExpenseParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: EXPENSES,
      variables: expense,
    });
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
