import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBaseTables1649037781145 implements MigrationInterface {
    name = 'AddBaseTables1649037781145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`email_request\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastUpdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`subject\` varchar(255) NOT NULL, \`body\` longtext NOT NULL, \`status\` enum ('0', '1', '2') NOT NULL, \`priority\` enum ('0', '1', '2') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sender\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`domain\` (\`id\` varchar(36) NOT NULL, \`domain\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`domain\``);
        await queryRunner.query(`DROP TABLE \`sender\``);
        await queryRunner.query(`DROP TABLE \`email_request\``);
    }

}
