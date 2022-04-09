import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTrackingFieldsToEmail1649510277793 implements MigrationInterface {
    name = 'AddTrackingFieldsToEmail1649510277793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`firstOpenedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`lastOpenedAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`lastOpenedAt\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`firstOpenedAt\``);
    }

}
