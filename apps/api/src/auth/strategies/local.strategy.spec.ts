import { LocalStrategy } from './local.strategy';
import { UsersService } from '../../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let usersService: any;

  beforeEach(() => {
    usersService = { validateUser: jest.fn() };
    strategy = new LocalStrategy(usersService);
  });

  it('should return user if valid', async () => {
    usersService.validateUser.mockResolvedValue({ email: 'a@b.com' });
    const result = await strategy.validate('a@b.com', 'pass');
    expect(result).toEqual({ email: 'a@b.com' });
  });

  it('should throw if user is invalid', async () => {
    usersService.validateUser.mockResolvedValue(null);
    await expect(strategy.validate('a@b.com', 'wrong')).rejects.toThrow(UnauthorizedException);
  });
}); 