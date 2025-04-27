/**
 * Error messages used throughout the user module for consistency and maintainability.
 */
export const USER_ERRORS = {
  EMAIL_ALREADY_REGISTERED: 'Email is already registered',
}; 

/**
 * Log messages used for user-related events, such as user creation and login attempts.
 */
export const USER_LOGS = {
  USER_CREATED: 'User created successfully',
  DUPLICATE_EMAIL: 'Attempt to register with an already registered email',
  FAILED_LOGIN_ATTEMPT: 'Failed login attempt for user',
  ACCOUNT_LOCKED: 'User account locked due to too many failed login attempts',
  RESET_FAILED_ATTEMPTS: 'Reset failed login attempts for user',
}; 