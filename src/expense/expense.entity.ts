import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ExpenseCategory, ExpenseStatus } from './expense.enum';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@Table
export class Expense extends Model<Expense> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

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

  @Column({ type: DataType.ENUM(...Object.values(ExpenseCategory)) })
  category!: ExpenseCategory;

  @Column({ allowNull: true, type: DataType.ARRAY(DataType.STRING) })
  attachments: string[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments?: Comment[];
}
