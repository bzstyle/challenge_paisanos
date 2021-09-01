/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/modules/user/Services/user.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: LoginDto): Promise<any> {
    const { username, password } = data;
    const user = await this.userService.getUserByUsername(username);
    const isValid = user ? await bcrypt.compare(password, user.password) : null;
    if (!isValid) {
      throw new HttpException(
        `Credenciales invalidas`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async generateToken(user: any) {
    const { name, id, role } = user;
    const payload = { ref: id, role };
    const access_token = this.jwtService.sign(payload);
    return { access_token, name, role };
  }

  async googleLogin(req) {
    if (!req.user) {
      throw new HttpException(
        `Credenciales invalidas, No user from google`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    let user = await this.userService.getUserByUsername(req.user.email);
    if (!user) {
      user = await this.userService.create({
        name: req.user.firstName,
        username: req.user.email,
        password: 'loginByGoogle',
      });
      //return 'No user from db'
    }

    return {
      message: 'User information from google',
      user_google: req.user,
      user: user,
    };
  }

  async facebookLogin(req) {
    if (!req.user) {
      throw new HttpException(
        `Credenciales invalidas, No user from google`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    let user = await this.userService.getUserByUsername(req.user.email);

    if (!user) {
      user = await this.userService.create({
        name: req.user.firstName,
        username: req.user.email,
        password: 'loginByFacebook',
      });
    }

    return {
      message: 'User information from Facebook',
      user_facebook: req.user,
      user: user,
    };
  }
}
