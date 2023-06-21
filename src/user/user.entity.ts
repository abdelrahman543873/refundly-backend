import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Expense } from '../expense/expense.entity';
import { Company } from '../company/company.entity';

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

  @Column
  avatar: string;

  @HasMany(() => Expense)
  expenses?: Expense[];

  @ForeignKey(() => Company)
  @Column({ allowNull: true })
  companyId?: number;

  @BelongsTo(() => Company)
  company?: Company;

  token?: string;

  @BeforeCreate
  static creationEmailLowerCase(user: User) {
    user.email = user.email.toLowerCase();
  }

  @BeforeUpdate
  static updateEmailLowerCase(user: User) {
    if (user.email) user.email = user.email.toLowerCase();
  }
}
