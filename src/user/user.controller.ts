import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  async authenticateUser(@Body() authDto: AuthDto) {
    return await this.userService.authenticateUser(authDto);
  }
}
