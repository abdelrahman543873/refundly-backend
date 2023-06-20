import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './dtos/auth.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  async authenticateUser(@Body() authDto: AuthDto) {
    return await this.userService.authenticateUser(authDto);
  }

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto) {
    return await this.userService.registerUser(registerDto);
  }
}
