import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEmailPriorityField1649122523831 implements MigrationInterface {
    name = 'UpdateEmailPriorityField1649122523831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` CHANGE \`status\` \`status\` enum ('pending', 'sent', 'rejected') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` CHANGE \`priority\` \`priority\` enum ('low', 'normal', 'high') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`email_request\` CHANGE \`priority\` \`priority\` enum ('0', '1', '2') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`email_request\` CHANGE \`status\` \`status\` enum ('0', '1', '2') NOT NULL`);
    }

}
