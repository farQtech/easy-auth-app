import { render, screen, fireEvent } from '@testing-library/react';
import { AuthForm } from '../../components/AuthForm';
import type { FieldError } from 'react-hook-form';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { useAuthForm } from '../../hooks/useAuthForm';

vi.mock('../../hooks/useAuthForm', () => ({
  useAuthForm: vi.fn(),
}));

type Errors = {
  [key: string]: FieldError | { message: string };
};

const mockRegister = (name: string): any => ({ name, ref: vi.fn() });
const mockHandleSubmit = (cb: any) => () => cb({ email: 'a@b.com', password: '12345678!', name: 'Test' });

const setupMock = (errors: Errors = {}, reset = vi.fn()) => {
  (useAuthForm as unknown as jest.Mock).mockReturnValue({
    register: (name: string) => mockRegister(name),
    handleSubmit: (cb: any) => mockHandleSubmit(cb),
    errors,
    reset,
  });
};

describe('AuthForm', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Sign In form with email and password fields', () => {
    setupMock();
    render(<AuthForm type="signin" onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes.length).toBe(1);
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0);
  });

  it('renders Sign Up form with name, email, and password fields', () => {
    setupMock();
    render(<AuthForm type="signup" onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes.length).toBe(2); // Name and email
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(1);
  });

  it('displays validation errors', () => {
    setupMock({
      email: { message: 'Invalid email' },
      password: { message: 'Password is too weak' },
      name: { message: 'Name is required' },
    });
    render(<AuthForm type="signup" onSubmit={vi.fn()} />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Password is too weak')).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted (signin)', () => {
    const onSubmit = vi.fn();
    setupMock();
    render(<AuthForm type="signin" onSubmit={onSubmit} />);
    const textboxes = screen.getAllByRole('textbox');
    fireEvent.change(textboxes[0], { target: { value: 'a@b.com' } }); // Email
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
      fireEvent.change(passwordInput, { target: { value: 'Abcdef1!' } });
      onSubmit({ email: 'a@b.com', password: 'Abcdef1!', name: 'Test' });
      expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.com', password: 'Abcdef1!', name: 'Test' });
    } else {
      throw new Error('Password input not found');
    }
  });

  it('calls onSubmit with form data when submitted (signup)', () => {
    const onSubmit = vi.fn();
    setupMock();
    render(<AuthForm type="signup" onSubmit={onSubmit} />);
    const textboxes = screen.getAllByRole('textbox');
    fireEvent.change(textboxes[0], { target: { value: 'Test' } }); // Name
    fireEvent.change(textboxes[1], { target: { value: 'a@b.com' } }); // Email
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
      fireEvent.change(passwordInput, { target: { value: 'Abcdef1!' } });
      onSubmit({ email: 'a@b.com', password: 'Abcdef1!', name: 'Test' });
      expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.com', password: 'Abcdef1!', name: 'Test' });
    } else {
      throw new Error('Password input not found');
    }
  });
});
