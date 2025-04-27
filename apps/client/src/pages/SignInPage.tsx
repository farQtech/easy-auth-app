import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { signInUser } from '../utils/api';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { TOAST_MESSAGES, ROUTE_PATHS, UI_LABELS } from '../utils/constants';

export const SignInPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  
  const handleSignin = async (data: { email: string; password: string }) => {
    setApiError(null);
    try{
      const response =  await signInUser(data);
      const accessToken = response?.access_token;
      if (!!accessToken) {
        toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
        navigate(ROUTE_PATHS.APP);
      }
    }catch(error: any){
      setApiError(error?.response?.data?.message || TOAST_MESSAGES.LOGIN_FAILED);
      toast.error(TOAST_MESSAGES.LOGIN_FAILED);
    }
  };

  return (
  <>
  <AuthForm type="signin" onSubmit={handleSignin} apiError={apiError} />
  <p style={{ marginTop: '20px', textAlign: 'center' }}>
        {UI_LABELS.DONT_HAVE_ACCOUNT}{' '}
        <Link to={ROUTE_PATHS.SIGNUP} style={{ color: '#007BFF' }}>
          {UI_LABELS.SIGN_UP}
        </Link>
      </p>
  </>
  );
};
