import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInput, AuthResult, SignInpData } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CustomRequest } from './guards/auth.guard';
import { UserForCreate, UsersService } from './services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getMe(req: CustomRequest): Promise<AuthResult | null> {
    const token = req.cookies?.access_token;
    if (!token) {
      return null;
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findById(decoded.sub);

      if (!user) {
        return null;
      }
      return {
        userId: user.id,
        name: user.name ?? user.email,
        useremail: user.email,
      };
    } catch (_) {
      return null;
    }
  }

  async authenticate(input: AuthInput, res: Response): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user, res);
  }

  async validateUser(input: AuthInput): Promise<SignInpData | null> {
    const user = await this.usersService.findByEmail(input.email);
    if (user) {
      const isMatch = await bcrypt.compare(input.password, user.password);
      if (isMatch) {
        return {
          name: user.name ?? user.email,
          userId: user.id,
          email: user.email,
        };
      }
    }

    return null;
  }

  async register(
    input: UserForCreate,
    res: Response,
  ): Promise<{ result: boolean }> {
    const user = await this.usersService.addUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.signIn(user, res);

    return { result: true };
  }

  signOut(res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
    });

    return Promise.resolve({ message: 'Loged out' });
  }

  async signIn(user: SignInpData, res: Response): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.email,
    };

    const access_token = await this.jwtService.signAsync(tokenPayload);

    res.cookie('access_token', access_token, {
      httpOnly: true,
    });

    return {
      userId: user.userId,
      useremail: user.email,
      name: user.name ?? user.email,
    };
  }
}
