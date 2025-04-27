import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema'; // Assuming UserDocument is the type generated for the schema
import { CreateUserDto } from './dto/create-user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { USER_ERRORS, USER_LOGS } from './users.constants';

/**
 * Service responsible for user management, including creation, lookup, and login attempt tracking.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /**
   * Creates a new user with a hashed password.
   * Checks for duplicate email and logs the event.
   * @param dto - The data required to create a user.
   * @returns The newly created user (with password removed).
   * @throws {ConflictException} If the email is already registered.
   */
  async create(dto: CreateUserDto): Promise<User> {
    const { email, password, name } = dto;

    // Check if the email already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.warn(`${USER_LOGS.DUPLICATE_EMAIL}: ${email}`);
      throw new ConflictException(USER_ERRORS.EMAIL_ALREADY_REGISTERED);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      name,
    });

    const newUser = await createdUser.save();

    this.logger.warn(`${USER_LOGS.USER_CREATED}: ${email}`);

    newUser.password = '';

    return newUser;
  }

  /**
   * Finds a user by email. Optionally selects sensitive fields (like password).
   * @param email - The user's email address.
   * @param selectSecrets - Whether to include sensitive fields.
   * @returns The user document or null if not found.
   */
  async findOne(email: string, selectSecrets = false): Promise<UserDocument | null> {
    const query = this.userModel.findOne({ email });

    if (selectSecrets) {
      query.select('+password');
    }

    return query.exec();
  }

  /**
   * Increments the failed login attempts for a user and locks the account if the max is reached.
   * Logs the event accordingly.
   * @param user - The user document to update.
   */
  async incrementFailedLoginAttempts(user: UserDocument) {
    user.failedLoginAttempts += 1;
    user.lastFailedLogin = new Date();

    const MAX_ATTEMPTS = 5;
    if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
      user.accountStatus = 'locked';
      this.logger.warn(`${USER_LOGS.ACCOUNT_LOCKED}: ${user.email}`);
    } else {
      this.logger.warn(`${USER_LOGS.FAILED_LOGIN_ATTEMPT}: ${user.email}`);
    }

    await user.save();
  }

  /**
   * Resets the failed login attempts for a user.
   * Logs the event.
   * @param user - The user document to update.
   */
  async resetFailedLoginAttempts(user: UserDocument) {
    user.failedLoginAttempts = 0;
    user.lastFailedLogin = undefined;
    await user.save();
    this.logger.warn(`${USER_LOGS.RESET_FAILED_ATTEMPTS}: ${user.email}`);
  }
}
