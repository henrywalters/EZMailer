import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEmailRequest1649040824290 implements MigrationInterface {
    name = 'UpdateEmailRequest1649040824290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`template\` (\`id\` varchar(36) NOT NULL, \`body\` longtext NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`context\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`templateId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD CONSTRAINT \`FK_c8b281b1b97dd96933a76d020c8\` FOREIGN KEY (\`templateId\`) REFERENCES \`template\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP FOREIGN KEY \`FK_c8b281b1b97dd96933a76d020c8\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`templateId\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`context\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`body\` longtext NOT NULL`);
        await queryRunner.query(`DROP TABLE \`template\``);
    }

}
