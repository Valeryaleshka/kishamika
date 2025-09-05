import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseService } from '../database/database.service';
import * as process from 'node:process';
import {UsersService} from "./services/users.service";

@Module({
  providers: [AuthService, UsersService, DatabaseService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
