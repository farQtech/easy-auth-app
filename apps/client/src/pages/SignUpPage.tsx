import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuthForm } from '../hooks/useAuthForm';
import { signUpUser } from '../utils/api';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const SignUpPage = () => {
    const navigate = useNavigate();
  const { reset } = useAuthForm('signup');
  const [apiError, setApiError] = useState<string | null>(null);
  
  const handleSignup = async (data: { email: string; password: string; name?: string }) => {
    setApiError(null);
    try {
      await signUpUser(data);
      toast.success('Signup successful! Redirecting...');
      reset();
      navigate('/signin');
    } catch (error: any) {
      setApiError(error?.response?.data?.message || 'Signup failed. Please check your input.');
      toast.error('Signup failed. Please check your input.');
    }
  };

  return (
  <>
    <AuthForm type="signup" onSubmit={handleSignup} apiError={apiError} />
    <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to="/signin" style={{ color: '#007BFF' }}>
          Sign In
        </Link>
      </p>
  </>
  );
};
