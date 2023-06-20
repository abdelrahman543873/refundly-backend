import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { BaseRepository } from '../shared/abstract/repository.abstract';
import { AuthDto } from './dtos/auth.dto';

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

  findUserByEmail(authDto: AuthDto) {
    return this.model.findOne({ where: { email: authDto.email }, raw: true });
  }
}
