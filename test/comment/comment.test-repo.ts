import { CommentRepository } from '../../src/comment/comment.repository';

export const commentRepo = (): CommentRepository => global.commentRepository;
