import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { BaseRepository } from '../shared/abstract/repository.abstract';
import { AuthDto } from './dtos/auth.dto';
import { RegisterDto } from './dtos/register.dto';
import { hashPassSync } from '../shared/utilities/bcryptHelper.util';
import { UserRoleEnum } from './user.enum';
import { UpdateUserDto } from './dtos/update-user.dto';

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
    return this.model.findOne({
      where: { email: authDto.email },
      raw: true,
    });
  }

  updateUser(
    updateUserDto: UpdateUserDto,
    avatar: Express.Multer.File,
    id: number,
  ) {
    return this.model.update(
      {
        ...updateUserDto,
        ...(updateUserDto.password && {
          password: hashPassSync(updateUserDto.password),
        }),
        ...(avatar && {
          avatar: `${process.env.APP_HOST}users/${avatar.filename}`,
        }),
      },
      { where: { id }, returning: true },
    );
  }

  registerUser(registerDto: RegisterDto, avatar: Express.Multer.File) {
    return this.model.create({
      email: registerDto.email,
      name: registerDto.name,
      role: UserRoleEnum.EMPLOYEE,
      password: hashPassSync(registerDto.password),
      ...(avatar && {
        avatar: `${process.env.APP_HOST}users/${avatar.filename}`,
      }),
    });
  }
}
