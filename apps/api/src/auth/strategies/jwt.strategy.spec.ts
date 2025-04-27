import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let usersService: any;
  let configService: any;

  beforeEach(() => {
    usersService = { findOne: jest.fn() };
    configService = { get: jest.fn().mockReturnValue('secret') };
    strategy = new JwtStrategy(configService, usersService);
  });

  it('should return user if valid', async () => {
    usersService.findOne.mockResolvedValue({ email: 'a@b.com', accountStatus: 'active' });
    const payload = { email: 'a@b.com', sub: 'id' };
    const result = await strategy.validate(payload);
    expect(result).toEqual({ userId: 'id', email: 'a@b.com' });
  });

  it('should throw if user not found', async () => {
    usersService.findOne.mockResolvedValue(null);
    const payload = { email: 'a@b.com', sub: 'id' };
    await expect(strategy.validate(payload)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw if account is not active', async () => {
    usersService.findOne.mockResolvedValue({ email: 'a@b.com', accountStatus: 'locked' });
    const payload = { email: 'a@b.com', sub: 'id' };
    await expect(strategy.validate(payload)).rejects.toThrow(UnauthorizedException);
  });
}); 