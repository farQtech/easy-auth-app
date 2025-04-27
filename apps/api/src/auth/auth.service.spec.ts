import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as bcrypt from 'bcryptjs';

const mockUsersService = {
  findOne: jest.fn(),
  incrementFailedLoginAttempts: jest.fn(),
  resetFailedLoginAttempts: jest.fn(),
};
const mockJwtService = { sign: jest.fn() };
const mockLogger = { warn: jest.fn(), error: jest.fn() };

describe('AuthService', () => {
  let service: AuthService;
  let usersService: typeof mockUsersService;
  let jwtService: typeof mockJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: WINSTON_MODULE_PROVIDER, useValue: mockLogger },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('returns null if user not found', async () => {
      usersService.findOne.mockResolvedValue(null);
      const result = await service.validateUser({ email: 'a@b.com', password: 'pass' });
      expect(result).toBeNull();
    });
    it('throws if account is locked', async () => {
      usersService.findOne.mockResolvedValue({ email: 'a@b.com', password: 'hash', accountStatus: 'locked' });
      await expect(service.validateUser({ email: 'a@b.com', password: 'pass' })).rejects.toThrow();
    });
    it('returns null if password does not match', async () => {
      usersService.findOne.mockResolvedValue({ email: 'a@b.com', password: 'hash', accountStatus: 'active', failedLoginAttempts: 0 });
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));
      const result = await service.validateUser({ email: 'a@b.com', password: 'wrong' });
      expect(result).toBeNull();
    });
    it('returns user if password matches', async () => {
      usersService.findOne.mockResolvedValue({ email: 'a@b.com', password: 'hash', accountStatus: 'active', failedLoginAttempts: 1 });
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
      usersService.resetFailedLoginAttempts = jest.fn();
      const result = await service.validateUser({ email: 'a@b.com', password: 'right' });
      expect(result).toBeTruthy();
      if (result) {
        expect(result.password).toBe('');
      }
    });
  });

  describe('login', () => {
    it('returns access_token', async () => {
      jwtService.sign.mockReturnValue('jwt');
      const result = await service.login({ email: 'a@b.com', id: 'id' });
      expect(result).toEqual({ access_token: 'jwt' });
    });
  });
});
