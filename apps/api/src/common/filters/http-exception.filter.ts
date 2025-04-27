import { ExceptionFilter, Catch, ArgumentsHost, Logger, Inject, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { APP_MESSAGES } from '../app.constants';

@Injectable()
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = APP_MESSAGES.INTERNAL_SERVER_ERROR;
    let stack = exception.stack || '';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    this.logger.error(`${APP_MESSAGES.EXCEPTION_OCCURRED} ${message}`, stack);

    // Send a response with error details
    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}
