import { Column, CreateDateColumn,
     Entity, PrimaryGeneratedColumn, 
     UpdateDateColumn } from "typeorm";

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;
    
}
