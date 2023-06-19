import { buildExpenseParams } from './expense.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { EXPENSE } from '../endpoints/expense.endpoints';

describe('add Expense suite case', () => {
  it('should add expense successfully', async () => {
    const expense = await buildExpenseParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: EXPENSE,
      variables: expense,
    });
    expect(res.body.status).toBe(expense.status);
    expect(+res.body.value).toBe(+expense.value);
  });
});
