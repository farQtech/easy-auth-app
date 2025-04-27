/**
 * General application messages for use in responses and exceptions.
 */
export const APP_MESSAGES = {
  HELLO_WORLD: 'Hello World!',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  EXCEPTION_OCCURRED: 'Exception occurred:',
  API_EXCEPTION_PREFIX: 'APIException:',
};

/**
 * Route path constants for controllers and routing logic.
 */
export const ROUTE_PATHS = {
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
};

/**
 * Guard type constants for use with NestJS AuthGuard.
 */
export const GUARD_TYPES = {
  JWT: 'jwt',
  LOCAL: 'local',
};

/**
 * Field name constants for use in validation and strategies.
 */
export const FIELD_NAMES = {
  EMAIL: 'email',
}; 