import { IsString } from "class-validator";

export class TeamDto {
    
    @IsString()
    name: string;

}
