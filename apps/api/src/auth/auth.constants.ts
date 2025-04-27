/**
 * Error messages used throughout the authentication module for consistency and maintainability.
 */
export const AUTH_ERRORS = {
  ACCOUNT_LOCKED: 'Account locked due to multiple failed login attempts.',
  INVALID_PASSWORD: 'Invalid password for user',
  USER_NOT_FOUND: 'User not found with email',
  ERROR_VALIDATE_USER: 'Error occurred during validateUser',
}; 

/**
 * Log messages used for authentication-related events, such as login attempts and account status changes.
 */
export const AUTH_LOGS = {
  LOGIN_ATTEMPT_LOCKED: 'Login attempt for locked account',
}; 