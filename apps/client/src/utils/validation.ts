/**
 * Regular expression for validating strong passwords.
 * - Minimum 8 characters
 * - At least 1 letter
 * - At least 1 number
 * - At least 1 special character
 */
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

/**
 * Checks if a password meets the strength requirements.
 * @param password - The password string to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
export const isValidPassword = (password: string) => {
  return passwordRegex.test(password);
};
