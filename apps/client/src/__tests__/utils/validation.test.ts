import { isValidPassword } from '../../utils/validation';

describe('isValidPassword', () => {
  it('returns true for valid password', () => {
    expect(isValidPassword('Abcdef1!')).toBe(true);
  });

  it('returns false for password without special char', () => {
    expect(isValidPassword('Abcdef12')).toBe(false);
  });

  it('returns false for password without number', () => {
    expect(isValidPassword('Abcdefgh!')).toBe(false);
  });

  it('returns false for password without letter', () => {
    expect(isValidPassword('12345678!')).toBe(false);
  });

  it('returns false for short password', () => {
    expect(isValidPassword('A1!a')).toBe(false);
  });
}); 