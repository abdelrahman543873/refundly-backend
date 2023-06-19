import { ExpenseStatus } from '../../src/expense/expense.enum';
import { faker } from '@faker-js/faker';
import { Expense } from '../../src/expense/expense.entity';
import { ExpenseRepo } from './expense.test-repo';

interface ExpenseType {
  title?: string;
  status?: ExpenseStatus;
  value?: number;
  currency?: string;
  description?: string;
}

export const buildExpenseParams = (obj: ExpenseType = {}): ExpenseType => {
  return {
    title: obj.title || faker.commerce.productName(),
    status:
      obj.status || faker.helpers.arrayElement(Object.values(ExpenseStatus)),
    value: obj.value || faker.number.int(),
    description: obj.description || faker.commerce.productDescription(),
    currency: obj.currency || faker.finance.currencyCode(),
  };
};

export const expenseFactory = async (
  obj: ExpenseType = {},
): Promise<Expense> => {
  const params: ExpenseType = buildExpenseParams(obj);
  return await ExpenseRepo().create(params);
};
