import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AUTH_ERRORS, AUTH_LOGS } from './auth.constants';

/**
 * Service responsible for authentication logic, including user validation and JWT login.
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /**
   * Validates a user's credentials.
   * Checks if the user exists, is not locked, and if the password matches.
   * Handles failed login attempts and account lockout.
   * @param {LoginDto} param0 - The login data containing email and password.
   * @returns {Promise<User | null>} The user object without password if valid, otherwise null.
   * @throws {UnauthorizedException} If the account is locked.
   */
  async validateUser({ email, password }: LoginDto) {
    const user = await this.usersService.findOne(email, true);
    if (!user) {
      this.logger.warn(`${AUTH_ERRORS.USER_NOT_FOUND}: ${email}`);
      return null;
    }

    if (user.accountStatus === 'locked') {
      this.logger.warn(`${AUTH_LOGS.LOGIN_ATTEMPT_LOCKED}: ${email}`);
      throw new UnauthorizedException(AUTH_ERRORS.ACCOUNT_LOCKED);
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        this.logger.warn(`${AUTH_ERRORS.INVALID_PASSWORD}: ${email}`);
        await this.usersService.incrementFailedLoginAttempts(user);
        return null;
      }

      if (user.failedLoginAttempts > 0) {
        await this.usersService.resetFailedLoginAttempts(user);
      }
    } catch (error) {
      this.logger.error(AUTH_ERRORS.ERROR_VALIDATE_USER, { stack: error.stack });
      return null;
    }

    user.password = '';
    return user;
  }

  /**
   * Generates a JWT access token for a valid user.
   * @param user - The user object (should have email and id).
   * @returns An object containing the access token.
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
