import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { errorMappings } from './errorMappings';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorCode = exception.code;
    const errorMapping = errorMappings[errorCode];

    if (errorMapping) {
      const { status, message } = errorMapping;
      response.status(status).json({
        statusCode: status,
        message: `${message}, Error Code: ${errorCode.replace('P', 'BG')}`,
      });
    } else {
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
      super.catch(exception, host);
    }
  }
}
