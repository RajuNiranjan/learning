import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthTable1770911731827 implements MigrationInterface {
    name = 'AddAuthTable1770911731827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth_signup" ("id" SERIAL NOT NULL, "status" "public"."auth_signup_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "fleet_id" integer NOT NULL, CONSTRAINT "PK_b972c198eb596f9a342fae5b358" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth_signup"`);
    }

}
