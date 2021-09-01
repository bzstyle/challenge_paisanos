import { Body, Controller, Get, Res, HttpStatus, Post, Request, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TeamService } from '../../service/team.service';
import { TeamDto } from '../../dto/team-dto';
import { AuthRole } from 'src/shared/decorators/auth.role.decorator';
import { Roles } from 'src/shared/enums/role.enums';


@Controller('teams')
@ApiTags('team')
export class TeamController {

constructor(private teamService: TeamService){}


  @Get()
  //@AuthRole(Roles.USER)
  @ApiOperation({ description: 'get all teams' })
  async getAllTeams() {

    const teams = await this.teamService.findAllTeams();
    return teams;
  }
  @Get(':id')
  //@AuthRole(Roles.USER)
  @ApiOperation({ description: 'get team by id' })
  async getByIdteam(@Param('id') idTeam){

    const team = await this.teamService.findByIdTeams(idTeam);
    return team;
  }

  @Post('/create')
  //@AuthRole(Roles.ADMIN)
  @ApiOperation({ description: 'create team' })
  create(@Body() createTeamDto: TeamDto ,@Res() res){

    this.teamService.createTeam(createTeamDto)
    .then(team => {
        res.status(HttpStatus.CREATED).json({mensaje: 'Team created.'});
    }).catch( () => {
        res.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error trying to create.'});
    });
  }

  @Put('/update/:id')
  //@AuthRole(Roles.ADMIN)
  @ApiOperation({ description: 'create team' })
  update(@Body() updateteam: TeamDto ,@Res() response ,@Param('id') idTeam){

    this.teamService.updateTeam(idTeam , updateteam)
    .then(team =>{
      response.status(HttpStatus.OK).json({mensaje: 'Update team.'});
    }).catch( () =>{
      response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error trying to update.'});
    });
  }

  @Delete('/delete/:id')
  //@AuthRole(Roles.ADMIN)
  @ApiOperation({ description: 'delete team' })
  delete(@Param('id') idTeam , @Res() response){

    this.teamService.deleteTeam(idTeam)
    .then(team =>{
      response.status(HttpStatus.OK).json({mensaje: 'Delete team.'});
    }).catch( () =>{
      response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error trying to update.'});
    });
  }


}
