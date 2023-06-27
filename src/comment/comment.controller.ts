import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddCommentDto } from './dtos/add-comment.dto';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '../shared/guards/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('attachments'))
  @Post()
  async addComment(
    @Body() addCommentDto: AddCommentDto,
    @UploadedFiles() attachments: Array<Express.Multer.File>,
  ) {
    return await this.commentService.addComment(
      addCommentDto,
      attachments,
      this.request.user.id,
    );
  }
}
