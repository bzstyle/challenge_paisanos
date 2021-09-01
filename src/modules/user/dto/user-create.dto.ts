import { IsEmail, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;

  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
