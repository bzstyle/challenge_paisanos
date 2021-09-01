import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrytp from 'bcrypt';

import { User } from '../entities/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { Team } from 'src/modules/team/entity/team.entity';
import { TeamService } from '../../team/service/team.service';

@Injectable()
export class UserService {


   private teamService: TeamService;
  

  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    
  ) {}



  getUserByUsername(username: string) {
    return this.repo.findOne({ username });
  }

  getUserByGoogleToken(username: string) {
    return this.repo.findOne({ username });
  }

  getUserByFacebookToken(username: string) {
    return this.repo.findOne({ username });
  }

  async findById(id: number) {
    const user = await this.repo.findOne({ id });
    if (!user) {
      throw new HttpException(
        'User not found with id: ' + id,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async alreadyExist(username: String) {
    const existsUser = await this.repo.findOne({ where: { username } });
    if (existsUser) {
      throw new HttpException(
        'user already Exist with name: ' + username,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: UserCreateDto) {
    await this.alreadyExist(data.username);
    if (
      data.password !== 'loginByGoogle' &&
      data.password !== 'loginByFacebook'
    ) {
      data.password = await bcrytp.hash(data.password, 10);
    }
    const user = this.repo.create(data);
    await this.repo.save(user);
    return user;
  }

  async update(id: number, data: UserUpdateDto , teamId: number) {
   /*  async update(id: number, data: UserUpdateDto ) { */

    let team = await this.teamService.findByIdTeams(teamId);
    let user = await this.findById(id);
    if (user.username != data.username) {
      await this.alreadyExist(data.username);
    }
    user.name = data.name;
    user.username = data.username;
    user.favoriteTeam = team.name;
    /* user = { ...user, ...data }; */
    await this.repo.save(user);
    return user;
  }

  async findAll() {
    const users = await this.repo.find();
    return users;
  }

  async delete(id: number) {
    let user = await this.findById(id);
    await this.repo.remove(user);
  }
}
