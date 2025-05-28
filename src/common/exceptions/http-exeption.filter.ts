import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // Extract the error message
    const exceptionResponse = exception.getResponse();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const message : string = typeof exceptionResponse === 'string'
      ? exceptionResponse
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      : (exceptionResponse as any)?.message || 'Internal server error';

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
  }
}