import { buildExpenseParams } from './expense.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { EXPENSES } from '../endpoints/expense.endpoints';

describe('add Expense suite case', () => {
  it('should add expense successfully', async () => {
    const expense = await buildExpenseParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: EXPENSES,
      variables: expense,
      filePath,
      fileParam: 'attachments',
    });
    expect(res.body.status).toBe(expense.status);
    expect(+res.body.value).toBe(+expense.value);
  });
});
