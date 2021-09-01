import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamController } from "./controller/team/team.controller";
import { Team } from "./entity/team.entity";
import { TeamService } from "./service/team.service";


@Module({
    imports: [TypeOrmModule.forFeature([Team])],
    providers: [TeamService],
    exports: [TeamService],
    controllers: [TeamController],
  })
  export class TeamModule {}