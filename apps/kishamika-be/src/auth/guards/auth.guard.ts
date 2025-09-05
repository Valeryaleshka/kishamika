import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface CustomRequest extends Request {
  cookies: {
    access_token?: string;
  };
}

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token; // `string | undefined`

    if (!token) {
      throw new UnauthorizedException('No authorization token provided');
    }

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
