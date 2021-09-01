import {MigrationInterface, QueryRunner} from "typeorm";

export class teamData1630498407498 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO team (name) VALUES('boca')`);
        await queryRunner.query(`INSERT INTO team (name) VALUES('river')`);
        await queryRunner.query(`INSERT INTO team (name) VALUES('banfield')`);
        await queryRunner.query(`INSERT INTO team (name) VALUES('independiente')`);
        await queryRunner.query(`INSERT INTO team (name) VALUES('racing')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM team`);
    }

}
