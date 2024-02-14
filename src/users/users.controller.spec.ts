import { UsersController, User } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    usersController = new UsersController(usersService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', () => {
      const users: User[] = [
        { id: '1', username: 'user1', age: 25, hobbies: ['reading', 'coding'] },
        {
          id: '2',
          username: 'user2',
          age: 30,
          hobbies: ['gaming', 'traveling'],
        },
      ];
      jest.spyOn(usersService, 'getAllUsers').mockReturnValue(users);

      expect(usersController.getAllUsers()).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return a user when a valid userId is provided', () => {
      const user: User = {
        id: '1',
        username: 'user1',
        age: 25,
        hobbies: ['reading', 'coding'],
      };
      jest.spyOn(usersService, 'getUserById').mockReturnValue(user);

      expect(usersController.getUserById('1')).toEqual(user);
    });

    it('should throw NotFoundException when an invalid userId is provided', () => {
      jest.spyOn(usersService, 'getUserById').mockReturnValue(undefined);

      expect(() => usersController.getUserById('invalidId')).toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        username: 'newUser',
        age: 28,
        hobbies: ['writing', 'painting'],
      };
      const createdUser: User = {
        id: '1',
        ...createUserDto,
      };
      jest.spyOn(usersService, 'createUser').mockReturnValue(createdUser);

      expect(usersController.createUser(createUserDto)).toEqual(createdUser);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', () => {
      const updateUserDto: CreateUserDto = {
        username: 'updatedUser',
        age: 30,
        hobbies: ['swimming', 'coding'],
      };
      const updatedUser: User = {
        id: '1',
        ...updateUserDto,
      };
      jest.spyOn(usersService, 'updateUser').mockReturnValue(updatedUser);

      expect(usersController.updateUser('1', updateUserDto)).toEqual(
        updatedUser,
      );
    });

    it('should throw NotFoundException when updating a non-existing user', () => {
      jest.spyOn(usersService, 'updateUser').mockReturnValue(undefined);

      expect(() =>
        usersController.updateUser('invalidId', {} as CreateUserDto),
      ).toThrowError(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', () => {
      jest.spyOn(usersService, 'deleteUser').mockReturnValue(true);

      expect(usersController.deleteUser('1')).toEqual(200); // Assuming you return HttpStatus.OK
    });

    it('should throw NotFoundException when deleting a non-existing user', () => {
      jest.spyOn(usersService, 'deleteUser').mockReturnValue(false);

      expect(() => usersController.deleteUser('invalidId')).toThrowError(
        NotFoundException,
      );
    });
  });
});
