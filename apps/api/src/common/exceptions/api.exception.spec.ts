import { APIException } from './api.exception';
import { InternalServerErrorException } from '@nestjs/common';

describe('APIException', () => {
  it('should be instance of InternalServerErrorException', () => {
    const err = new APIException('test error');
    expect(err).toBeInstanceOf(InternalServerErrorException);
  });

  it('should format the message', () => {
    const err = new APIException('something went wrong');
    expect(err.message).toContain('APIException: something went wrong');
  });
}); 