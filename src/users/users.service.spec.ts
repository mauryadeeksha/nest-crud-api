import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.controller';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
  });

  describe('getAllUsers', () => {
    it('should return an empty array initially', () => {
      expect(usersService.getAllUsers()).toEqual([]);
    });

    it('should return all users when users are present', () => {
      const users: User[] = [
        { id: '1', username: 'user1', age: 25, hobbies: ['reading', 'coding'] },
        {
          id: '2',
          username: 'user2',
          age: 30,
          hobbies: ['gaming', 'traveling'],
        },
      ];
      usersService['users'] = users;

      expect(usersService.getAllUsers()).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return null when user does not exist', () => {
      expect(usersService.getUserById('nonexistentId')).toBeUndefined();
    });

    it('should return the user when user exists', () => {
      const user: User = {
        id: '1',
        username: 'user1',
        age: 25,
        hobbies: ['reading', 'coding'],
      };
      usersService['users'] = [user];

      expect(usersService.getUserById('1')).toEqual(user);
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        username: 'newUser',
        age: 28,
        hobbies: ['writing', 'painting'],
      };

      const createdUser = usersService.createUser(createUserDto);
      expect(createdUser).toHaveProperty('id');
      expect(createdUser.username).toBe(createUserDto.username);
      expect(createdUser.age).toBe(createUserDto.age);
      expect(createdUser.hobbies).toEqual(createUserDto.hobbies);
    });
  });

  describe('updateUser', () => {
    it('should return null when user does not exist', () => {
      expect(
        usersService.updateUser('nonexistentId', {} as CreateUserDto),
      ).toBeNull();
    });

    it('should update an existing user', () => {
      const existingUser: User = {
        id: '1',
        username: 'user1',
        age: 25,
        hobbies: ['reading', 'coding'],
      };
      usersService['users'] = [existingUser];

      const updateUserDto: CreateUserDto = {
        username: 'updatedUser',
        age: 30,
        hobbies: ['swimming', 'coding'],
      };

      const updatedUser = usersService.updateUser('1', updateUserDto);
      expect(updatedUser).toEqual({ ...existingUser, ...updateUserDto });
    });
  });

  describe('deleteUser', () => {
    it('should return false when user does not exist', () => {
      expect(usersService.deleteUser('nonexistentId')).toBeFalsy();
    });

    it('should delete an existing user', () => {
      const existingUser: User = {
        id: '1',
        username: 'user1',
        age: 25,
        hobbies: ['reading', 'coding'],
      };
      usersService['users'] = [existingUser];

      expect(usersService.deleteUser('1')).toBeTruthy();
      expect(usersService.getAllUsers()).toHaveLength(0);
    });
  });
});
