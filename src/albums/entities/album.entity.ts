import { ArtistEntity } from "src/artists/entities/artist.entity";
import { TrackEntity } from "src/tracks/entities/track.entity";
import { Album } from "src/types";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => ArtistEntity,
    (artist) => artist.albums, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  constructor(albumData: Partial<AlbumEntity>) {
    Object.assign(this, albumData);
  }
}
