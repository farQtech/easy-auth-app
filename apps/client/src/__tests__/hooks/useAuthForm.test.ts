import { renderHook } from '@testing-library/react';
import { useAuthForm } from '../../hooks/useAuthForm';

describe('useAuthForm', () => {
  it('returns register, handleSubmit, errors, and reset for signup', () => {
    const { result } = renderHook(() => useAuthForm('signup'));
    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('reset');
  });

  it('returns register, handleSubmit, errors, and reset for signin', () => {
    const { result } = renderHook(() => useAuthForm('signin'));
    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('reset');
  });
}); 