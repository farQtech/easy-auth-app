import { HttpExceptionFilter } from './http-exception.filter';
import { ArgumentsHost, HttpException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;
  let mockLogger: any;
  let mockResponse: any;
  let mockHost: any;

  beforeEach(() => {
    mockLogger = { error: jest.fn() };
    filter = new HttpExceptionFilter();
    // @ts-ignore
    filter.logger = mockLogger;
    mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockHost = {
      switchToHttp: () => ({ getResponse: () => mockResponse }),
    } as unknown as ArgumentsHost;
  });

  it('should catch HttpException and send formatted response', () => {
    const exception = new HttpException('Forbidden', 403);
    filter.catch(exception, mockHost);
    expect(mockLogger.error).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 403,
        message: 'Forbidden',
        error: 'HttpException',
      })
    );
  });

  it('should catch generic Error and send 500 response', () => {
    const exception = new Error('fail');
    filter.catch(exception, mockHost);
    expect(mockLogger.error).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        message: 'fail',
        error: 'Error',
      })
    );
  });
}); 