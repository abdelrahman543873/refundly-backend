import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './dtos/auth.dto';
import { RegisterDto } from './dtos/register.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  async authenticateUser(@Body() authDto: AuthDto) {
    return await this.userService.authenticateUser(authDto);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  async registerUser(
    @Body() registerDto: RegisterDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.userService.registerUser(registerDto, avatar);
  }
}
