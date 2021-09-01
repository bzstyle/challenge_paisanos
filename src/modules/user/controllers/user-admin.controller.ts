import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  HttpStatus,
  Res,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { Response } from 'express';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from '../Services/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jw.guard';
import { Roles } from 'src/shared/enums/role.enums';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';

@Controller('admin')
@ApiTags('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserAdminController {
  constructor(private service: UserService) {}

  @Get('users')
  @ApiBearerAuth()
  @SetMetadata('roles', Roles.ADMIN)
  @ApiOperation({ description: 'get all user' })
  async getAll() {
    const users = await this.service.findAll();
    return users;
  }

  @Get('users/:id')
  @ApiBearerAuth()
  @SetMetadata('roles', Roles.ADMIN)
  @ApiOperation({ description: 'get all user' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const users = await this.service.findById(id);
    return users;
  }

  @Post('users')
  @ApiBearerAuth()
  @SetMetadata('roles', Roles.ADMIN)
  @ApiOperation({ description: 'Create a new user' })
  async create(@Body() data: UserCreateDto) {
    const user = await this.service.create(data);
    return user;
  }

  @Put('users/:id')
  @ApiBearerAuth()
  @SetMetadata('roles', Roles.ADMIN)
  @ApiOperation({ description: 'Edit a user by id' })
  async update(
    @Param('id', ParseIntPipe) id: number,@Param('id') idTeam: number,
    @Body() data: UserUpdateDto,
  ) {
    /* const user = await this.service.update(id, data ); */
    const user = await this.service.update(id, data ,idTeam);
    return user;
  }

  @Delete('users/:id')
  @ApiBearerAuth()
  @SetMetadata('roles', Roles.ADMIN)
  @ApiOperation({ description: 'Create a  new user' })
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.service.delete(id);
    res.status(HttpStatus.OK).json({ message: 'user deleted' });
  }
}
