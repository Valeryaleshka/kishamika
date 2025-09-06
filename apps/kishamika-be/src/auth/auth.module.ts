import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseService } from '../database/database.service';
import { UsersService } from './services/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, UsersService, DatabaseService],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
})
export class AuthModule {}
