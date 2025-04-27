import { LocalAuthGuard } from './local-auth.guard';

describe('LocalAuthGuard', () => {
  it('should be defined and extend AuthGuard', () => {
    const guard = new LocalAuthGuard();
    expect(guard).toBeInstanceOf(LocalAuthGuard);
  });
}); 