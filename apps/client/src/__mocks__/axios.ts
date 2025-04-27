import { vi } from 'vitest';
const mockUse = vi.fn();
const mockPost = vi.fn().mockImplementation((url: any, _data: any) => {
  if (url === '/auth/register') {
    return Promise.resolve({ data: { success: true } });
  }
  if (url === '/auth/login') {
    return Promise.resolve({ data: { access_token: 'token' } });
  }
  return Promise.resolve({ data: {} });
});

const create = vi.fn(() => ({
  interceptors: { request: { use: mockUse } },
  post: mockPost,
}));

export default { create };
export { mockUse, mockPost }; 