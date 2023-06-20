import { buildExpenseParams } from './expense.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { EXPENSES } from '../endpoints/expense.endpoints';
import { userFactory } from '../user/user.factory';

describe('add Expense suite case', () => {
  it('should add expense successfully', async () => {
    const user = await userFactory();
    const expense = await buildExpenseParams({ userId: user.id });
    delete expense.userId;
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: EXPENSES,
      variables: expense,
      token: user.token,
      fileParam: 'attachments',
      filePath,
    });
    expect(res.body.status).toBe(expense.status);
    expect(+res.body.value).toBe(+expense.value);
  });
});
