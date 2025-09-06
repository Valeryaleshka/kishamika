import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../database/database.service';
import { SignInpData } from '../auth.types';

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserForCreate = {
  email: string;
  password: string;
  name: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }
    return user;
  }

  async findById(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }
    return user;
  }

  async addUser(user: UserForCreate): Promise<SignInpData | null> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    const newUser: UserForCreate = {
      email: user.email,
      password: hash,
      name: user.name,
    };

    console.log('Created user', newUser);
    const createdUser = await this.databaseService.user.create({
      data: newUser,
    });

    if (newUser) {
      return { userId: createdUser.id, email: createdUser.email };
    }

    return null;
  }
}
