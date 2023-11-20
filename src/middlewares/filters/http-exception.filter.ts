import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const log = {
      timestamp: new Date().toISOString(),
      path: request.url,
      data: exception?.getResponse() || {},
    };

    this.logger.error(log);

    response.status(status).json({
      success: false,
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception?.message || '',
      data: exception?.getResponse() || {},
    });
  }
}
