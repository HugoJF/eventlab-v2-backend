import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEventsTable1628607058600 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'events',
            foreignKeys: [{
                name: 'user_id_foreign',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id']
            }],
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                generationStrategy: 'increment',
                isGenerated: true,
            }, {
                name: 'title',
                type: 'varchar',
            }, {
                name: 'description',
                type: 'text',
            }, {
                name: 'user_id',
                type: 'int',
            }, {
                name: 'starts_at',
                type: 'timestamp',
            }, {
                name: 'ends_at',
                type: 'timestamp',
            }, {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }, {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }],
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('events');
    }
}
