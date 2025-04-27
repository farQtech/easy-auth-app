import React from 'react';
import { InputField } from './InputField';
import { useAuthForm } from '../hooks/useAuthForm';

interface AuthFormProps {
  type: 'signin' | 'signup';
  onSubmit: (data: any) => void;
  apiError?: string | null;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, apiError }) => {
  const { register, handleSubmit, errors } = useAuthForm(type, onSubmit);

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>{type === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
      {apiError && (
        <div style={{ color: 'red', marginBottom: 10 }}>{apiError}</div>
      )}
      {/* Show 'Name' field only for Signup */}
      {type === 'signup' && (
        <InputField
          label="Name"
          type="text"
          {...register('name')}
          error={(errors as any).name?.message}
        />
      )}

      <InputField
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <InputField
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      <button name="submit" type="submit" style={{ marginTop: '20px' }}>
        {type === 'signup' ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};
