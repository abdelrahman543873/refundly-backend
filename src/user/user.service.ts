import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  findUserById(userId: number) {
    return this.userRepository.findUserById(userId);
  }

  async authenticateUser(authDto: AuthDto) {
    const user = await this.userRepository.findUserByEmail({
      email: authDto.email,
    });
    user.token = this.jwtService.sign({ userId: user.id });
    return user;
  }

  updateUser(
    updateUserDto: UpdateUserDto,
    avatar: Express.Multer.File,
    userId: number,
  ) {
    return this.userRepository.updateUser(updateUserDto, avatar, userId);
  }

  async registerUser(registerDto: RegisterDto, avatar: Express.Multer.File) {
    return await this.userRepository.registerUser(registerDto, avatar);
  }
}
