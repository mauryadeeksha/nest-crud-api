import {
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsInt()
  age: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  hobbies: string[];
}
