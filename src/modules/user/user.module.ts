import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './Services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserAdminController } from './controllers/user-admin.controller';
import { Team } from '../team/entity/team.entity';
import { TeamService } from '../team/service/team.service';
import { TeamController } from '../team/controller/team/team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController, UserAdminController],
})
@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService],
  exports: [TeamService],
  controllers: [TeamController],
})
export class UserModule {}
