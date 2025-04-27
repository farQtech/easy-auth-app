import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { InputField } from '../../components/InputField';
import '@testing-library/jest-dom';

describe('InputField', () => {
  it('renders label and input', () => {
    render(<InputField label="Email" name="email" type="email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<InputField label="Password" name="password" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('forwards ref to input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputField label="Name" name="name" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
