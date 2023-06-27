import { ExpenseCategory, ExpenseStatus } from '../../src/expense/expense.enum';
import { faker } from '@faker-js/faker';
import { Expense } from '../../src/expense/expense.entity';
import { ExpenseRepo } from './expense.test-repo';
import { userFactory } from '../user/user.factory';

interface ExpenseType {
  title?: string;
  status?: ExpenseStatus;
  value?: number;
  currency?: string;
  description?: string;
  attachments?: string[];
  userId?: number;
  category?: ExpenseCategory;
}

export const buildExpenseParams = async (
  obj: ExpenseType = {},
): Promise<ExpenseType> => {
  return {
    title: obj.title || faker.commerce.productName(),
    status:
      obj.status || faker.helpers.arrayElement(Object.values(ExpenseStatus)),
    value: obj.value || faker.number.int(),
    description: obj.description || faker.commerce.productDescription(),
    currency: obj.currency || faker.finance.currencyCode(),
    attachments: obj.attachments || [faker.internet.url()],
    category:
      obj.category ||
      faker.helpers.arrayElement(Object.values(ExpenseCategory)),
    userId: obj.userId || (await userFactory()).id,
  };
};

export const expenseFactory = async (
  obj: ExpenseType = {},
): Promise<Expense> => {
  const params: ExpenseType = await buildExpenseParams(obj);
  return await ExpenseRepo().create(params);
};
