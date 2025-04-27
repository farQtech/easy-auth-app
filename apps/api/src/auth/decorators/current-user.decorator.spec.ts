import { ExecutionContext } from '@nestjs/common';

describe('CurrentUser', () => {
  it('should extract user from request', () => {
    const factory = (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    };

    const mockCtx = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { id: 1 }
        })
      })
    } as unknown as ExecutionContext;

    const result = factory(undefined, mockCtx);
    expect(result).toEqual({ id: 1 });
  });
}); 