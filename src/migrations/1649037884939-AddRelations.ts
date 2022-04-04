import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelations1649037884939 implements MigrationInterface {
    name = 'AddRelations1649037884939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sender\` ADD \`domainId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD \`senderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`sender\` ADD CONSTRAINT \`FK_e9ddbeef87e658cf57106ba9272\` FOREIGN KEY (\`domainId\`) REFERENCES \`domain\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_request\` ADD CONSTRAINT \`FK_0db9c172837d7520bd907b2370d\` FOREIGN KEY (\`senderId\`) REFERENCES \`sender\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP FOREIGN KEY \`FK_0db9c172837d7520bd907b2370d\``);
        await queryRunner.query(`ALTER TABLE \`sender\` DROP FOREIGN KEY \`FK_e9ddbeef87e658cf57106ba9272\``);
        await queryRunner.query(`ALTER TABLE \`email_request\` DROP COLUMN \`senderId\``);
        await queryRunner.query(`ALTER TABLE \`sender\` DROP COLUMN \`domainId\``);
    }

}
