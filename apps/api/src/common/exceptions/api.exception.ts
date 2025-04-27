import { InternalServerErrorException } from '@nestjs/common';
import { APP_MESSAGES } from '../app.constants';

/**
 * Custom exception for API errors, extending NestJS InternalServerErrorException.
 * Prepends a standard prefix to all API exception messages for consistency.
 */
export class APIException extends InternalServerErrorException {
  constructor(message: string) {
    super(`${APP_MESSAGES.API_EXCEPTION_PREFIX} ${message}`);
  }
} 