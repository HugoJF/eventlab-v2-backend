import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEventUserTable1628609799749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'event_user',
            columns: [{
                name: 'user_id',
                type: 'int',
            }, {
                name: 'event_id',
                type: 'int',
            }],
            indices: [{
                name: 'event_user_unique',
                isUnique: true,
                columnNames: ['user_id', 'event_id'],
            }]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('event_user');
    }

}
