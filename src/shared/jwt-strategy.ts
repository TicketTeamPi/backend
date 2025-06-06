import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as fs from 'fs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.jwt]),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync('./public.key', 'utf-8'),
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.id,
      email: payload.email,
      enterpriseId: payload.enterpriseId,
    };
  }
}
