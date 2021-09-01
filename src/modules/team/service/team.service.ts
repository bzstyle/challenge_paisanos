import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entity/team.entity';
import { TeamDto } from '../dto/team-dto';

@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team)
        private teamRepositoy: Repository<Team>,
      ) {}


      async findAllTeams() {

        const teams = await this.teamRepositoy.find();
        return teams;
      }

      async findByIdTeams( id: number) {
        const teamId = await this.teamRepositoy.findOne({id});

          if (!teamId) {
            throw new HttpException('id not found',HttpStatus.NOT_FOUND);
          }
          return teamId;
      }


      async createTeam(newTeam: TeamDto ){

        const team = new Team();
        team.name = newTeam.name;
        return this.teamRepositoy.save(team);
      }


      async updateTeam(idTeam: number ,updateTeam: TeamDto){

        const team = await this.teamRepositoy.findOne(idTeam);
        team.name = updateTeam.name;

        return this.teamRepositoy.save(team);
      }


      async deleteTeam(id: number) {

        const team = await this.findByIdTeams(id);
        await this.teamRepositoy.remove(team);
      }
}
