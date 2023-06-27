import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Expense } from '../expense/expense.entity';

@Table
export class Comment extends Model<Comment> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  content: string;

  @Column({ allowNull: true, type: DataType.ARRAY(DataType.STRING) })
  attachments?: string[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Expense)
  @Column
  expenseId: number;

  @BelongsTo(() => Expense)
  expense: Expense;
}
