import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { UserAuthResponse } from './dtos/userAuthResponse.dto';
import { User } from './user.entity';

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
    return this.createAuthResponseWithJWT(user);
  }

  async registerUser(registerDto: RegisterDto): Promise<UserAuthResponse> {
   const user = await this.userRepository.registerUser(registerDto);
   return this.createAuthResponseWithJWT(user)
  }

  private createAuthResponseWithJWT(user: User): UserAuthResponse {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    companyId: user.companyId,
    token: this.jwtService.sign({ userId: user.id }),
  };
}
}
