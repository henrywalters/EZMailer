import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsDefaultVersionToTemplate1649210867840 implements MigrationInterface {
    name = 'AddsDefaultVersionToTemplate1649210867840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`template\` CHANGE \`version\` \`version\` int NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`template\` CHANGE \`version\` \`version\` int NOT NULL`);
    }

}
