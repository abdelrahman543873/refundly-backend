import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { LANGUAGE } from '../constants/lang.enum';
import { getLocalizedMessage } from '../utilities/error-message-localization.util';
import { RequestContext } from '../interfaces/request-context.interface';

@Catch(BaseHttpException)
export class BaseHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<RequestContext>();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    response.status(statusCode).json({
      isSuccess: false,
      statusCode,
      message: getLocalizedMessage(
        statusCode,
        (request.headers['accept-language'] as LANGUAGE) || LANGUAGE.EN,
      ),
    });
  }
}
