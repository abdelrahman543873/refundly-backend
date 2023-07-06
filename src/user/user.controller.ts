import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './dtos/auth.dto';
import { RegisterDto } from './dtos/register.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  @Post('auth')
  async authenticateUser(@Body() authDto: AuthDto) {
    return await this.userService.authenticateUser(authDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('info')
  async info() {
    return this.request.user;
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
