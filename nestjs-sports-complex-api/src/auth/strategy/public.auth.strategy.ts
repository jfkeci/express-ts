import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class PublicJwtStrategy extends PassportStrategy(Strategy, 'jwt-p') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'nest-sports-api-31k2maaAdS2Kl',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
