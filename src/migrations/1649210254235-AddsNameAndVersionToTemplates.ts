import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsNameAndVersionToTemplates1649210254235 implements MigrationInterface {
    name = 'AddsNameAndVersionToTemplates1649210254235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`template\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`template\` ADD \`version\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`template\` DROP COLUMN \`version\``);
        await queryRunner.query(`ALTER TABLE \`template\` DROP COLUMN \`name\``);
    }

}
