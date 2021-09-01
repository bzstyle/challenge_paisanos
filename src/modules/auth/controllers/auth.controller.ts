import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';

import { LoginDto } from '../dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
//import { loginApple } from 'src/modules/auth/strategies/apple.strategy';
/* import { authorizationUrl } from 'src/modules/auth/strategies/apple.strategy'; */

/* import fs from 'fs'; */
/* import path from 'path'; */
/* import { getAuthToken } from '@exoshtw/apple-auth-backend'; */

@Controller('auth')
@ApiTags('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  //@ApiExcludeEndpoint()
  @ApiOperation({ description: 'Login user' })
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(data);
    const response = await this.authService.generateToken(user);
    res.status(HttpStatus.OK).json(response);
  }

  @Get('google')
  //@ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() res) {
    res.status(HttpStatus.OK).json({ url: 'localhost:3000/auth/google' });
  }

  @Get('google/redirect')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = await this.authService.googleLogin(req);
    const response = await this.authService.generateToken(user.user);
    return res.status(HttpStatus.OK).json({ response });
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(@Req() req, res): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res: Response) {
    return {
      statusCode: HttpStatus.OK,
      data: res,
    };
    //return res.status(HttpStatus.OK).json({ name: 'isaac' });
    //const user = this.authService.facebookLogin(req);
    //return res.status(HttpStatus.OK).json(res);
    //return res.status(HttpStatus.OK).json(user);
    //return res.status(HttpStatus.OK).json( this.authService.facebookLogin(req) );
    //return this.authService.facebookLogin(req);
  }

  @Get('/apple')
  async appleLoginRedirect(@Res() res) {
    console.log('aqui');
    return res.write(
      '<a href="https://appleid.apple.com/auth/authorize?client_id=com.paisanoscreando.boilerbackend.client&redirect_uri=https%3A%2F%2Fboilerbackend.paisanos.io%2Fauth%2Fapple%2Fcallback&response_type=code%20id_token&scope=name%20email&response_mode=web_message">aqui</a>',
    );
    //return <buttom>authorizationUrl()</buttom>;
    //return  authorizationUrl();
    //const response = await loginApple('myCode');
    //console.log(response);
    //return res.status(HttpStatus.OK).json({ 'url': response });
    //return res.status(HttpStatus.OK).json({ 'url':<buttom>authorizationUrl()</buttom> });
  }

  @Get('/apple/callback')
  async appleLoginCallback(@Req() req, @Res() res: Response) {
    //const response = await loginApple('myCode');
    console.log(req.query.code);

    return res.status(HttpStatus.OK).json({ myCodeIs: req.query.code });

    //return res.status(HttpStatus.OK).json({res});
  }
}
