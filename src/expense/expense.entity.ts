import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ExpenseStatus } from './expense.enum';

@Table
export class Expense extends Model<Expense> {
  @Column
  title!: string;

  @Column({ type: DataType.ENUM(...Object.values(ExpenseStatus)) })
  status!: ExpenseStatus;

  @Column({ type: DataType.DECIMAL })
  value!: number;

  @Column
  currency!: string;

  @Column({ allowNull: true })
  description?: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
