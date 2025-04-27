import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignInPage } from '../../pages/SignInPage';
import * as api from '../../utils/api';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('SignInPage', () => {
  it('renders AuthForm', () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0);
  });

  it('shows success toast on successful sign in', async () => {
    vi.spyOn(api, 'signInUser').mockResolvedValue({ access_token: 'token' });
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );
    const textboxes = screen.getAllByRole('textbox');
    fireEvent.change(textboxes[0], { target: { value: 'a@b.com' } });
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
      fireEvent.change(passwordInput, { target: { value: 'Abcdef1!' } });
    }
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      fireEvent.click(submitButton);
    }
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('shows error toast on failed sign in', async () => {
    vi.spyOn(api, 'signInUser').mockRejectedValue(new Error('fail'));
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );
    const textboxes = screen.getAllByRole('textbox');
    fireEvent.change(textboxes[0], { target: { value: 'a@b.com' } });
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
      fireEvent.change(passwordInput, { target: { value: 'Abcdef1!' } });
    }
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      fireEvent.click(submitButton);
    }
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
}); 