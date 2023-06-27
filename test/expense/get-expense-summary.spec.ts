import { ExpenseCategory } from '../../src/expense/expense.enum';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { EXPENSE_SUMMARY } from '../endpoints/expense.endpoints';
import { userFactory } from '../user/user.factory';
import { expensesFactory } from './expense.factory';

describe('get expense summary suite case', () => {
  it('should get expense summary successfully', async () => {
    const user = await userFactory();
    await expensesFactory(3, {
      value: 10,
      userId: user.id,
      category: ExpenseCategory.ACCOMMODATION,
    });
    await expensesFactory(3, {
      value: 20,
      userId: user.id,
      category: ExpenseCategory.BOOKS_PUBLICATIONS,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: EXPENSE_SUMMARY,
      token: user.token,
    });
    expect(res.body[0]).toHaveProperty('categoryTotal');
  });
});
