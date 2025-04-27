import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { APP_MESSAGES } from '../../common/app.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? 'secret',
    });
  }

  async validate(payload: any) {
    // only runs if the token is valid and successfully verified.
    // If the token is valid, the validate method is called with the decoded payload.
    const user = await this.usersService.findOne(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.accountStatus !== 'active') {
      throw new UnauthorizedException(`${payload.email}, account ${user.accountStatus}`);
    }

    return { userId: payload.sub, email: payload.email };
  }
}
