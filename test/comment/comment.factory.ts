import { faker } from '@faker-js/faker';
import { userFactory } from '../user/user.factory';
import { expenseFactory } from '../expense/expense.factory';
import { commentRepo } from './comment.test-repo';

interface CommentType {
  content?: string;
  attachments?: string[];
  userId?: number;
  expenseId?: number;
}

export const buildCommentParams = async (
  obj: CommentType,
): Promise<CommentType> => {
  return {
    content: obj.content || faker.lorem.sentence(),
    attachments: obj.attachments || [faker.image.url()],
    userId: obj.userId || (await userFactory()).id,
    expenseId: obj.expenseId || (await expenseFactory()).id,
  };
};

export const commentFactory = async (obj: CommentType = {}) => {
  const params = await buildCommentParams(obj);
  return await commentRepo().create({
    ...params,
  });
};
