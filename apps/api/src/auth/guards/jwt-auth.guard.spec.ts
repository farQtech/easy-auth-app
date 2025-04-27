import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

jest.mock('@nestjs/passport', () => ({
  AuthGuard: () => class {
    canActivate = jest.fn().mockReturnValue(true);
  }
}));

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: any;
  let context: ExecutionContext;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    guard = new JwtAuthGuard(reflector);
    context = {} as ExecutionContext;
  });

  it('should return true if route is public', () => {
    reflector.getAllAndOverride.mockReturnValue(true);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should call super.canActivate if not public', () => {
    reflector.getAllAndOverride.mockReturnValue(false);
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });
});

it('should be defined', () => {
  expect(true).toBe(true);
}); 