import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1628606392441 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment',
                isGenerated: true,
            }, {
                name: 'name',
                type: 'varchar',
            }, {
                name: 'email',
                type: 'varchar',
                isUnique: true,
            }, {
                name: 'password',
                type: 'varchar',
            }, {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }, {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
