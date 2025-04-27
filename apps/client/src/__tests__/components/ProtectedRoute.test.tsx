import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import * as authUtils from '../../utils/auth';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('../../utils/auth', async () => {
  const actual = await vi.importActual<typeof authUtils>('../../utils/auth');
  return {
    ...actual,
    getToken: vi.fn(),
  };
});

describe('ProtectedRoute', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children if token exists', () => {
    (authUtils.getToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue('token');
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to /signin if token does not exist', () => {
    (authUtils.getToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(undefined);
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
}); 