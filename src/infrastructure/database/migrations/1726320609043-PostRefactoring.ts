import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1726320609043 implements MigrationInterface {
  name = 'PostRefactoring1726320609043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_c6894e962b80bc10a694c0271e2" UNIQUE ("name"), CONSTRAINT "UQ_4cca40c3813d4b88a83edb459bc" UNIQUE ("email"), CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "business"`);
  }
}
