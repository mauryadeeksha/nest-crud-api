import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(userId: string): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(userData: CreateUserDto): User {
    const user: User = {
      id: uuidv4(),
      ...userData,
    };
    this.users.push(user);
    return user;
  }

  updateUser(userId: string, userData: CreateUserDto): User {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  deleteUser(userId: string): boolean {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
