import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { BaseRepository } from '../shared/abstract/repository.abstract';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User)
    protected readonly model: typeof User,
  ) {
    super(model);
  }

  findUserById(userId: number) {
    return this.model.findByPk(userId);
  }
}
