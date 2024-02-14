import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string): User {
    const user = this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() userData: CreateUserDto): User {
    return this.usersService.createUser(userData);
  }

  @Put(':userId')
  @UsePipes(ValidationPipe)
  updateUser(
    @Param('userId') userId: string,
    @Body() userData: CreateUserDto,
  ): User {
    const user = this.usersService.updateUser(userId, userData);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): HttpStatus {
    const result = this.usersService.deleteUser(userId);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return HttpStatus.OK;
  }
}
