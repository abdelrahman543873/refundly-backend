import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { commentFactory } from './comment.factory';
import { EXPENSE_COMMENTS } from '../endpoints/comment.endpoints';

describe('get expense comments suite case', () => {
  it('should get expense comments successfully', async () => {
    const user = await userFactory();
    const comment = await commentFactory({ userId: user.id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${EXPENSE_COMMENTS}/${comment.expenseId}`,
      variables: {
        expenseId: comment.expenseId,
      },
      token: user.token,
    });
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].content).toBe(comment.content);
  });
});
