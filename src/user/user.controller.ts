import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
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
import { AuthGuard } from '../shared/guards/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @Put()
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return (
      await this.userService.updateUser(
        updateUserDto,
        avatar,
        this.request.user.id,
      )
    )[1][0];
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
