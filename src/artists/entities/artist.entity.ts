import { AlbumEntity } from "src/albums/entities/album.entity";
import { TrackEntity } from "src/tracks/entities/track.entity";
import { Artist } from "src/types";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'artist' })
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[]

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[]

  constructor(artistData: Partial<ArtistEntity>) {
    Object.assign(this, artistData);
  }
}
