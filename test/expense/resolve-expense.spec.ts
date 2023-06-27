import { expenseFactory } from './expense.factory';
import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { RESOLVE_EXPENSE } from '../endpoints/expense.endpoints';
import { userFactory } from '../user/user.factory';
import { ExpenseStatus } from '../../src/expense/expense.enum';
import { UserRoleEnum } from '../../src/user/user.enum';

describe('resolve Expense suite case', () => {
  it('should resolve expense successfully', async () => {
    const user = await userFactory({ role: UserRoleEnum.OWNER });
    const expense = await expenseFactory({
      userId: user.id,
      status: ExpenseStatus.ACCEPTED,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: RESOLVE_EXPENSE,
      token: user.token,
      variables: {
        status: ExpenseStatus.REJECTED,
        id: expense.id,
      },
    });
    expect(res.body.status).toBe(ExpenseStatus.REJECTED);
  });

  it("should reject request if user doesn't role", async () => {
    const user = await userFactory({ role: UserRoleEnum.EMPLOYEE });
    const expense = await expenseFactory({
      userId: user.id,
      status: ExpenseStatus.ACCEPTED,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: RESOLVE_EXPENSE,
      token: user.token,
      variables: {
        status: ExpenseStatus.REJECTED,
        id: expense.id,
      },
    });
    expect(res.body.statusCode).toBe(603);
  });
});
