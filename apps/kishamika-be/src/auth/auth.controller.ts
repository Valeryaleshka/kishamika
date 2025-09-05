import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import express from 'express';
import * as authTypes from './auth.types';
import * as usersService from './services/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  getMe(@Req() req: express.Request) {
    return this.authService.getMe(req);
  }

  @Post('login')
  login(
    @Body() input: authTypes.AuthInput,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.authenticate(input, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(
    @Body() input: usersService.UserForCreate,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ result: boolean }> {
    return this.authService.register(input, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<{ message: string }> {
    return this.authService.signOut(res);
  }
}
