import { IsEmail, IsString } from 'class-validator';

export class UserUpdateDto {
  
  @IsString()
  name: string;

  @IsEmail()
  username: string;

  @IsString()
  favoriteTeam: string;

}
