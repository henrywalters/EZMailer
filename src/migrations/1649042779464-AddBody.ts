import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBody1649042779464 implements MigrationInterface {
    name = 'AddBody1649042779464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`body\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`attempts\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`attempts\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`body\``);
    }

}
