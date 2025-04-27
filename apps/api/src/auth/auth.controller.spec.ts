import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

const mockAuthService = { login: jest.fn() };
const mockUsersService = { create: jest.fn() };
const mockLogger = { error: jest.fn() };

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLogger },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return login result', async () => {
      mockAuthService.login.mockResolvedValue({ access_token: 'token' });
      const req = { user: { email: 'a@b.com' } } as any;
      const result = await controller.login(req);
      expect(result).toEqual({ access_token: 'token' });
    });
    it('should log error on exception', async () => {
      mockAuthService.login.mockImplementation(() => { throw new Error('fail'); });
      const req = { user: { email: 'a@b.com' } } as any;
      try {
        await controller.login(req);
      } catch (e) {
      }
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should return user on success', async () => {
      mockUsersService.create.mockResolvedValue({ email: 'a@b.com' });
      const body = { email: 'a@b.com', password: 'pass', name: 'Test' };
      const result = await controller.register(body);
      expect(result).toEqual({ email: 'a@b.com' });
    });
    it('should log error on exception', async () => {
      mockUsersService.create.mockImplementation(() => { throw new Error('fail'); });
      const body = { email: 'a@b.com', password: 'pass', name: 'Test' };
      try {
        await controller.register(body);
      } catch (e) {
      }
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });
});
