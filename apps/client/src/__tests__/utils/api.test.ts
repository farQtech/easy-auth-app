import { vi } from 'vitest';
import { signInUser, signUpUser } from '../../utils/api';
import * as authUtils from '../../utils/auth';

describe('api utils', () => {
  let mockApiClient: any;

  beforeEach(() => {
    mockApiClient = {
      post: vi.fn(),
      interceptors: { request: { use: vi.fn() } },
    };
    vi.clearAllMocks();
  });

  it('signUpUser posts to /auth/register and returns data', async () => {
    mockApiClient.post.mockResolvedValueOnce({ data: { success: true } });
    const data = await signUpUser({ email: 'a@b.com', password: '12345678!', name: 'Test' }, mockApiClient);
    expect(data).toEqual({ success: true });
  });

  it('signInUser posts to /auth/login, sets token, and returns data', async () => {
    const setTokenSpy = vi.spyOn(authUtils, 'setToken');
    mockApiClient.post.mockResolvedValueOnce({ data: { access_token: 'token' } });
    const data = await signInUser({ email: 'a@b.com', password: '12345678!' }, mockApiClient);
    expect(setTokenSpy).toHaveBeenCalledWith('token');
    expect(data).toEqual({ access_token: 'token' });
  });

  it('signInUser throws if no access_token', async () => {
    mockApiClient.post.mockResolvedValueOnce({ data: {} });
    await expect(signInUser({ email: 'a@b.com', password: '12345678!' }, mockApiClient)).rejects.toThrow('No access token received');
  });
}); 