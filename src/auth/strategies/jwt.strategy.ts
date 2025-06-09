import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      this.logger.error(
        `User not found for payload: ${JSON.stringify(payload)}`,
      );
      throw new UnauthorizedException();
    }
    return user;
  }
}
