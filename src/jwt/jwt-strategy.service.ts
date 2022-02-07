import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPublic } from 'src/users/dto/user';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.KEYCLOAK_PUBLIC_KEY,
    });
  }

  async validate(payload) {
    const user = new UserPublic();
    user.name = payload.name;
    user.email = payload.email;
    user.id = payload.sub;
    user.roles = payload.realm_access.roles;
    return user;
  }
}
