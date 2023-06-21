import { User } from './../user/user.entity';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Company extends Model<Company> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  name: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @Column
  avatar: string;

  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}
