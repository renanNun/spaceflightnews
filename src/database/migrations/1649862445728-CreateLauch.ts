import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLauch1649862445728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'lauch',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isUnique: true,
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('lauch');
    }

}
