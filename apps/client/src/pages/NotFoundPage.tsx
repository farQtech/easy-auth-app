import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/signin">
        Go to Sign In
      </Link>
    </div>
  );
};

export default NotFoundPage;
