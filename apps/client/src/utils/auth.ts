import Cookies from 'js-cookie';
import { COOKIE_KEYS } from './constants';

/**
 * Stores the authentication token in a cookie.
 * @param token - The JWT token to store.
 */
export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
     // Token expires in 1 day
    Cookies.set(COOKIE_KEYS.AUTH_TOKEN, token, { expires: 1 });
  }
};

/**
 * Retrieves the authentication token from the cookie.
 * @returns {string | undefined} The JWT token if present, otherwise undefined.
 */
export const getToken = (): string | undefined => {
  if (typeof window !== 'undefined') {
    return Cookies.get(COOKIE_KEYS.AUTH_TOKEN);
  }
  return undefined;
};

/**
 * Removes the authentication token from the cookie.
 */
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    Cookies.remove(COOKIE_KEYS.AUTH_TOKEN);
  }
};
