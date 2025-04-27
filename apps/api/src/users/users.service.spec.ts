import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as bcrypt from 'bcryptjs';
import { ConflictException } from '@nestjs/common';

const mockUserModel = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
});

const mockLogger = { error: jest.fn(), warn: jest.fn(), log: jest.fn() };

describe('UsersService', () => {
  let service: UsersService;
  let userModel: any;
  let logger: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useFactory: mockUserModel },
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get(getModelToken('User'));
    logger = module.get(WINSTON_MODULE_PROVIDER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user if email does not exist', async () => {
      userModel.findOne.mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue({
        email: 'test@example.com',
        password: 'hashed',
        name: 'Test',
        save: jest.fn().mockResolvedValue({ email: 'test@example.com', password: '', name: 'Test' }),
      });
      const userModelConstructor = jest.fn(() => ({ save: saveMock }));
      service['userModel'] = Object.assign(userModelConstructor, userModel);
      (jest.spyOn(bcrypt, 'genSalt') as any).mockResolvedValue('salt');
      (jest.spyOn(bcrypt, 'hash') as any).mockResolvedValue('hashed');
      const dto = { email: 'test@example.com', password: 'password', name: 'Test' };
      const result = await service.create(dto);
      expect(result.email).toBe('test@example.com');
      expect(result.password).toBe('');
    });

    it('should throw ConflictException if email exists', async () => {
      userModel.findOne.mockResolvedValue({ email: 'test@example.com' });
      const dto = { email: 'test@example.com', password: 'password', name: 'Test' };
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const execMock = jest.fn().mockResolvedValue({ email: 'test@example.com' });
      const selectMock = jest.fn().mockReturnValue({ exec: execMock });
      userModel.findOne.mockReturnValue({ select: selectMock, exec: execMock });
      const result = await service.findOne('test@example.com', true);
      expect(result).toEqual({ email: 'test@example.com' });
    });
  });

  describe('incrementFailedLoginAttempts', () => {
    it('should increment failed login attempts and lock account if needed', async () => {
      const user = { failedLoginAttempts: 4, save: jest.fn(), lastFailedLogin: null, accountStatus: 'active' };
      await service.incrementFailedLoginAttempts(user as any);
      expect(user.failedLoginAttempts).toBe(5);
      expect(user.accountStatus).toBe('locked');
      expect(user.save).toHaveBeenCalled();
    });
  });

  describe('resetFailedLoginAttempts', () => {
    it('should reset failed login attempts', async () => {
      const user = { failedLoginAttempts: 3, save: jest.fn(), lastFailedLogin: new Date() };
      await service.resetFailedLoginAttempts(user as any);
      expect(user.failedLoginAttempts).toBe(0);
      expect(user.lastFailedLogin).toBeUndefined();
      expect(user.save).toHaveBeenCalled();
    });
  });
}); 