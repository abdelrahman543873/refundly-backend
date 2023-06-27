import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/abstract/repository.abstract';
import { Comment } from './comment.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AddCommentDto } from './dtos/add-comment.dto';

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
  constructor(
    @InjectModel(Comment)
    protected readonly model: typeof Comment,
  ) {
    super(model);
  }

  addComment(
    userId: number,
    addCommentDto: AddCommentDto,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.model.create({
      userId,
      ...addCommentDto,
      ...(attachments && {
        attachments: attachments.map((attachment) => {
          return `${process.env.APP_HOST}comments/${attachment.filename}`;
        }),
      }),
    });
  }
}
