import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { ExistingUserValidator } from './validators/is-existing-user.validator';
import { CorrectPasswordValidator } from './validators/is-correct-password.validator';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLE_NAMES } from '../shared/constants/environment-variables.constant';
import { DuplicateEmailValidator } from './validators/is-duplicate-email.validator';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARIABLE_NAMES.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(
            ENV_VARIABLE_NAMES.JWT_EXPIRY_TIME,
          ),
        },
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [
    UserService,
    UserRepository,
    ExistingUserValidator,
    CorrectPasswordValidator,
    DuplicateEmailValidator,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
