import { AlbumEntity } from "src/albums/entities/album.entity";
import { FavoriteArtistEntity } from "src/favorites/entities/favoriteArtist.entity";
import { TrackEntity } from "src/tracks/entities/track.entity";
import { Artist } from "src/types";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => FavoriteArtistEntity, (favorite) => favorite.artist)
  @JoinColumn()
  favorite: FavoriteArtistEntity;
}
