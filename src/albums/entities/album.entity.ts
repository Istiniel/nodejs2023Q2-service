import { TrackEntity } from "src/tracks/entities/track.entity";
import { Album } from "src/types";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'album' })
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  year: number

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[]

  constructor(albumData: Partial<AlbumEntity>) {
    Object.assign(this, albumData);
  }
}
