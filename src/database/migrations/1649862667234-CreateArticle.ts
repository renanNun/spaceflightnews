import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateArticle1649862667234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'article',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'featured',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'url',
                        type: 'varchar',
                    },
                    {
                        name: 'imageUrl',
                        type: 'varchar',
                    },
                    {
                        name: 'newsSite',
                        type: 'varchar',
                    },
                    {
                        name: 'summary',
                        type: 'varchar',
                    },
                    {
                        name: 'publishedAt',
                        type: 'timestamp',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
