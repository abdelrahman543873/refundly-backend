import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { AddCommentDto } from './dtos/add-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  addComment(
    addCommentDto: AddCommentDto,
    attachments: Array<Express.Multer.File>,
    userId: number,
  ) {
    return this.commentRepository.addComment(
      userId,
      addCommentDto,
      attachments,
    );
  }
}
