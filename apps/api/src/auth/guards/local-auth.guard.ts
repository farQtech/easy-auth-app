import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GUARD_TYPES } from '../../common/app.constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(GUARD_TYPES.LOCAL) {}
