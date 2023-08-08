import { AlbumEntity } from "src/albums/entities/album.entity";
import { ArtistEntity } from "src/artists/entities/artist.entity";
import { FavoriteTrackEntity } from "src/favorites/entities/favoriteTrack.entity";
import { Track } from "src/types";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'track' })
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  duration: number

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks,
    { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks,
    { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  constructor(trackData: Partial<TrackEntity>) {
    Object.assign(this, trackData);
  }

  @OneToOne(() => FavoriteTrackEntity, (favorite) => favorite.track)
  @JoinColumn()
  favorite: FavoriteTrackEntity;
}
