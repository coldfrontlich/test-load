import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexes1739123456789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_items_id ON items(id)`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_items_created_at`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_items_id`);
  }
}
