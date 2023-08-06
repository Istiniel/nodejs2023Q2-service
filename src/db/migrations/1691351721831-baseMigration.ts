import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1691351721831 implements MigrationInterface {
    name = 'BaseMigration1691351721831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favoriteAlbum" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_577a79bacac3d3991adc9c1fcd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favoriteTrack" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_4a41e92f44d671422a17faf65fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "albumId" uuid, "artistId" uuid, "favoriteId" uuid, CONSTRAINT "REL_3fe48e88867570a3509868a764" UNIQUE ("favoriteId"), CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, "favoriteId" uuid, CONSTRAINT "REL_4073bbe6e9014b79c8acf27ab4" UNIQUE ("favoriteId"), CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favoriteArtist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_1b10f4864cb29b168b27a3e4be3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, "favoriteId" uuid, CONSTRAINT "REL_206394ec532b4eb7748b0700a3" UNIQUE ("favoriteId"), CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favoriteAlbum" ADD CONSTRAINT "FK_577a79bacac3d3991adc9c1fcd7" FOREIGN KEY ("id") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteTrack" ADD CONSTRAINT "FK_4a41e92f44d671422a17faf65fa" FOREIGN KEY ("id") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_3fe48e88867570a3509868a7645" FOREIGN KEY ("favoriteId") REFERENCES "favoriteTrack"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_4073bbe6e9014b79c8acf27ab45" FOREIGN KEY ("favoriteId") REFERENCES "favoriteAlbum"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteArtist" ADD CONSTRAINT "FK_1b10f4864cb29b168b27a3e4be3" FOREIGN KEY ("id") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "FK_206394ec532b4eb7748b0700a30" FOREIGN KEY ("favoriteId") REFERENCES "favoriteArtist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "FK_206394ec532b4eb7748b0700a30"`);
        await queryRunner.query(`ALTER TABLE "favoriteArtist" DROP CONSTRAINT "FK_1b10f4864cb29b168b27a3e4be3"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_4073bbe6e9014b79c8acf27ab45"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_3fe48e88867570a3509868a7645"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "favoriteTrack" DROP CONSTRAINT "FK_4a41e92f44d671422a17faf65fa"`);
        await queryRunner.query(`ALTER TABLE "favoriteAlbum" DROP CONSTRAINT "FK_577a79bacac3d3991adc9c1fcd7"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "favoriteArtist"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "favoriteTrack"`);
        await queryRunner.query(`DROP TABLE "favoriteAlbum"`);
    }

}
