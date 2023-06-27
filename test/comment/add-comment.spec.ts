import { testRequest } from '../config/request';
import { HTTP_METHODS_ENUM } from '../config/request.methods.enum';
import { userFactory } from '../user/user.factory';
import { buildCommentParams } from './comment.factory';
import { COMMENTS } from '../endpoints/comment.endpoints';

describe('add comment suite case', () => {
  it('should add comment successfully', async () => {
    const user = await userFactory();
    const comment = await buildCommentParams({ userId: user.id });
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: COMMENTS,
      variables: {
        expenseId: comment.expenseId,
        content: comment.content,
      },
      token: user.token,
      fileParam: 'attachments',
      filePath,
    });
    expect(res.body.userId).toBe(comment.userId);
    expect(res.body.expenseId).toBe(comment.expenseId);
  });
});
