import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utilities/multer-file-name.util';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client/comments',
        filename,
      }),
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
