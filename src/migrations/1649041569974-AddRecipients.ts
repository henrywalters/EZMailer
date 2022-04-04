import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRecipients1649041569974 implements MigrationInterface {
    name = 'AddRecipients1649041569974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`to\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`cc\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`bcc\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`bcc\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`cc\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`to\``);
    }

}
