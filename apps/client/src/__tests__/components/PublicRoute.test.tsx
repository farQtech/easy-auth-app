import { render, screen } from '@testing-library/react';
import PublicRoute from '../../components/PublicRoute';
import * as authUtils from '../../utils/auth';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('PublicRoute', () => {
  it('redirects to /app if token exists', () => {
    vi.spyOn(authUtils, 'getToken').mockReturnValue('token');
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <PublicRoute>
          <div>Public Content</div>
        </PublicRoute>
      </MemoryRouter>
    );
    expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
  });

  it('renders children if no token', () => {
    vi.spyOn(authUtils, 'getToken').mockReturnValue(undefined);
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <PublicRoute>
          <div>Public Content</div>
        </PublicRoute>
      </MemoryRouter>
    );
    expect(screen.getByText('Public Content')).toBeInTheDocument();
  });
}); 