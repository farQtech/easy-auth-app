import * as auth from '../../utils/auth';
import Cookies from 'js-cookie';
import { vi } from 'vitest';

vi.mock('js-cookie');

describe('auth utils', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('setToken sets cookie', () => {
    auth.setToken('abc');
    expect(Cookies.set).toHaveBeenCalledWith('auth_token', 'abc', { expires: 1 });
  });

  it('getToken gets cookie', () => {
    (Cookies.get as any).mockReturnValue('abc');
    expect(auth.getToken()).toBe('abc');
  });

  it('removeToken removes cookie', () => {
    auth.removeToken();
    expect(Cookies.remove).toHaveBeenCalledWith('auth_token');
  });
}); 