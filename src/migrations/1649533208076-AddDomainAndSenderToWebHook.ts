import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDomainAndSenderToWebHook1649533208076 implements MigrationInterface {
    name = 'AddDomainAndSenderToWebHook1649533208076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`web_hook\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastUpdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(255) NOT NULL, \`endpoint\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`domainId\` varchar(36) NULL, \`senderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`web_hook\` ADD CONSTRAINT \`FK_3fd3ef17b71ebb23712b64df0cd\` FOREIGN KEY (\`domainId\`) REFERENCES \`domain\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`web_hook\` ADD CONSTRAINT \`FK_0a0ba539ecab6d429c4af6040f9\` FOREIGN KEY (\`senderId\`) REFERENCES \`sender\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`web_hook\` DROP FOREIGN KEY \`FK_0a0ba539ecab6d429c4af6040f9\``);
        await queryRunner.query(`ALTER TABLE \`web_hook\` DROP FOREIGN KEY \`FK_3fd3ef17b71ebb23712b64df0cd\``);
        await queryRunner.query(`DROP TABLE \`web_hook\``);
    }

}
