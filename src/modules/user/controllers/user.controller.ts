import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Request,
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
import { AuthRole } from 'src/shared/decorators/auth.role.decorator';
import { Team } from '../../team/entity/team.entity';

@Controller('users')
@ApiTags('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private service: UserService) {}

  @Get('/me')
  @AuthRole(Roles.USER)
  @ApiOperation({ description: 'Get information About the current useasdasdr' })
  async findOneByOwnId(@Request() req) {
    const user = await this.service.findById(req.user.id);
    return user;
  }

  @Put('/me')
  @AuthRole(Roles.USER)
  @ApiOperation({ description: 'Update the current user' })
  async update(@Request() req, @Body() data: UserUpdateDto) {

    const user = await this.service.update(req.user.id, data ,req.team.id);
    /* const user = await this.service.update(req.user.id, data); */
    return user;
  }
}
