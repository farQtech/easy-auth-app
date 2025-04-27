import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { APIException } from '../common/exceptions/api.exception';
import { APP_MESSAGES, ROUTE_PATHS } from '../common/app.constants';

@Controller(ROUTE_PATHS.AUTH)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(ROUTE_PATHS.LOGIN)
  async login(@Request() req: Express.Request) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      this.logger.error(APP_MESSAGES.EXCEPTION_OCCURRED + ' during login', { stack: error.stack });
      throw new APIException(error.message);
    }
  }

  @SkipThrottle()
  @Public()
  @Post(ROUTE_PATHS.REGISTER)
  async register(@Body() body: CreateUserDto) {
    try {
      const user = await this.usersService.create(body);
      return user;
    } catch (error) {
      this.logger.error(APP_MESSAGES.EXCEPTION_OCCURRED + ' during register', { stack: error?.stack });
      throw new APIException(error.message);
    }
  }
}
