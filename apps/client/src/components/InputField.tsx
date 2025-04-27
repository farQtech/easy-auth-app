import  { forwardRef } from 'react';

interface InputFieldProps {
  label: string;
  name?: string;
  type?: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, type = 'text', error, ...rest }, ref) => {
    return (
      <div style={{ marginBottom: '16px' }}>
        <label>
          {label}
        </label>
        <input
          ref={ref}
          name={name}
          type={type}
          {...rest}
          style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px' }}
        />
        {error && (
          <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
