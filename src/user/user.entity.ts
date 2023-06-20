import {
  BeforeCreate,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Expense } from '../expense/expense.entity';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Expense)
  expenses: Expense[];

  token?: string;

  @BeforeCreate
  static makeEmailLowerCase(user: User) {
    user.email = user.email.toLowerCase();
  }
}
