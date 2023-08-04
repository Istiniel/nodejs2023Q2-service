import { AlbumEntity } from "src/albums/entities/album.entity";
import { Track } from "src/types";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'track' })
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;


  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @Column()
  duration: number

  constructor(trackData: Partial<TrackEntity>) {
    Object.assign(this, trackData);
  }
}
