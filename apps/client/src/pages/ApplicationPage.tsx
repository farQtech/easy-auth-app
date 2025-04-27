import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import { ROUTE_PATHS, UI_LABELS } from '../utils/constants';

const ApplicationPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken(); 
    navigate(ROUTE_PATHS.SIGNIN);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{UI_LABELS.WELCOME}</h1>
      <button onClick={handleLogout} >
        {UI_LABELS.LOGOUT}
      </button>
    </div>
  );
};

export default ApplicationPage;
