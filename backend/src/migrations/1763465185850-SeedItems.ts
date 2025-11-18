import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedItems1763465185850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < 50000; i++) {
      await queryRunner.query(`INSERT INTO items (name) VALUES ($1)`, [
        `Item ${i + 1}`,
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM items`);
  }
}
