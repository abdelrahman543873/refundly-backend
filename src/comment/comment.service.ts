import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { AddCommentDto } from './dtos/add-comment.dto';
import { GetExpenseComments } from './dtos/get-expense-comments.dto';

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

  getExpenseComments(getExpenseComments: GetExpenseComments) {
    return this.commentRepository.getExpenseComments(getExpenseComments);
  }
}
