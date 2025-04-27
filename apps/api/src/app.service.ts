import { Injectable } from '@nestjs/common';
import { APP_MESSAGES } from './common/app.constants';

/**
 * Application service providing general-purpose methods for the app.
 */
@Injectable()
export class AppService {
  /**
   * Returns a hello world message for health checks or root endpoint.
   * @returns {string} The hello world message.
   */
  getHello(): string {
    return APP_MESSAGES.HELLO_WORLD;
  }
}
