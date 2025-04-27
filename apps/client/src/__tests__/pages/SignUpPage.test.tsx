import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignUpPage } from '../../pages/SignUpPage';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import * as api from '../../utils/api';

vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('SignUpPage', () => {
  it('renders AuthForm', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
  });

  it('shows success toast on successful sign up', async () => {
    vi.spyOn(api, 'signUpUser').mockResolvedValue({});
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    const textboxes = screen.getAllByRole('textbox');
    fireEvent.change(textboxes[0], { target: { value: 'Test' } });
    fireEvent.change(textboxes[1], { target: { value: 'a@b.com' } });
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
      fireEvent.change(passwordInput, { target: { value: 'Abc12dr23@ef1!' } });
    }
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
      fireEvent.click(submitButton);
    }
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('shows error toast on failed sign up', async () => {
    vi.spyOn(api, 'signUpUser').mockRejectedValue(new Error('fail'));
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    const textboxes = screen.getAllByRole('textbox');
    fireEvent.change(textboxes[0], { target: { value: 'Test' } });
    fireEvent.change(textboxes[1], { target: { value: 'a@b.com' } });
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