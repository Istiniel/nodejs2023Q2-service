import { TrackEntity } from "src/tracks/entities/track.entity";
import {
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'favoriteTrack' })
export class FavoriteTrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => TrackEntity,
    (track) => track.favorite,
    { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'id' })
  track: TrackEntity;

  constructor(favoriteData: Partial<FavoriteTrackEntity>) {
    Object.assign(this, favoriteData);
  }
}
