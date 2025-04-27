/**
 * Validation messages for form fields, used throughout the app for consistency.
 */
export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  INVALID_EMAIL: 'Invalid email',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_TOO_WEAK: 'Password is too weak',
};

/**
 * UI labels and static text for use in components and pages.
 */
export const UI_LABELS = {
  DONT_HAVE_ACCOUNT: "Don't have an account?",
  SIGN_UP: 'Sign Up',
  WELCOME: 'Welcome to the application.',
  LOGOUT: 'Logout',
};

/**
 * Toast notification messages for user feedback.
 */
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
};

/**
 * API endpoint paths for backend communication.
 */
export const API_ENDPOINTS = {
  BASE: '/api',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
};

/**
 * Route paths for navigation and routing.
 */
export const ROUTE_PATHS = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  APP: '/app',
  PROTECTED: '/protected',
  NOT_FOUND: '*',
};

/**
 * Cookie key names for storing tokens and other data.
 */
export const COOKIE_KEYS = {
  AUTH_TOKEN: 'auth_token',
}; 